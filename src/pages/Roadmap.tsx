import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, FileText, Image as ImageIcon, ExternalLink, Video } from 'lucide-react';
import { s3Manager } from '@/lib/s3';
import { roadmapService, type RoadmapItem } from '@/lib/supabase-roadmap';
import { toast } from 'sonner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DOMPurify from 'dompurify';
import katex from 'katex';
import 'katex/dist/katex.min.css';

const Roadmap = () => {
  const [roadmapItems, setRoadmapItems] = useState<RoadmapItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      await loadRoadmapItems();
      
      // Subscribe to real-time changes
      const subscription = roadmapService.subscribeToChanges((updatedItems) => {
        setRoadmapItems(updatedItems);
      });

      return () => {
        subscription?.unsubscribe();
      };
    };

    const cleanup = initializeData();
    
    return () => {
      cleanup.then(cleanupFn => cleanupFn?.());
    };
  }, []);

  const loadRoadmapItems = async () => {
    try {
      setLoading(true);
      const items = await roadmapService.getAllItems();
      setRoadmapItems(items);
    } catch (error) {
      console.error('Error loading roadmap items:', error);
      toast.error('Erreur lors du chargement de la roadmap');
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (fileName: string) => {
    try {
      const fileUrl = await s3Manager.getFileUrl(fileName);
      window.open(fileUrl, '_blank');
      toast.success(`Ouverture du fichier: ${fileName.split('-').pop() || fileName}`);
    } catch (error) {
      console.error('Error opening file:', error);
      
      try {
        const fallbackUrl = `https://mvtlxvxywbdjkzcouyrn.supabase.co/storage/v1/object/public/global/${fileName}`;
        window.open(fallbackUrl, '_blank');
        toast.success(`Ouverture du fichier: ${fileName.split('-').pop() || fileName}`);
      } catch (fallbackError) {
        toast.error('Impossible d\'ouvrir le fichier.');
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'planned':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminé';
      case 'in-progress':
        return 'En cours';
      case 'planned':
        return 'Planifié';
      default:
        return status;
    }
  };

  const renderMarkdownContent = useMemo(() => {
    return (content?: string) => {
      if (!content) return null;

      // Validate and sanitize video IDs
      const validateYouTubeId = (id: string) => /^[a-zA-Z0-9_-]{11}$/.test(id);
      const validateVimeoId = (id: string) => /^[0-9]{1,10}$/.test(id);

      let html = content;

      // Process in specific order to avoid conflicts
      
      // 1. Math blocks (LaTeX) - protect from other replacements
      const mathBlocks: string[] = [];
      // Display math ($$...$$)
      html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
        const placeholder = `__MATH_BLOCK_${mathBlocks.length}__`;
        try {
          const rendered = katex.renderToString(math.trim(), {
            displayMode: true,
            throwOnError: false,
            output: 'html'
          });
          mathBlocks.push(`<div class="my-6 overflow-x-auto flex justify-center">${rendered}</div>`);
        } catch (e) {
          mathBlocks.push(`<div class="my-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">Erreur LaTeX: ${math}</div>`);
        }
        return placeholder;
      });
      
      // Inline math ($...$)
      html = html.replace(/\$([^\$\n]+)\$/g, (match, math) => {
        const placeholder = `__MATH_BLOCK_${mathBlocks.length}__`;
        try {
          const rendered = katex.renderToString(math.trim(), {
            displayMode: false,
            throwOnError: false,
            output: 'html'
          });
          mathBlocks.push(`<span class="inline-math">${rendered}</span>`);
        } catch (e) {
          mathBlocks.push(`<span class="text-red-700">Erreur: ${math}</span>`);
        }
        return placeholder;
      });
      
      // 2. Code blocks (protect from other replacements)
      const codeBlocks: string[] = [];
      html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
        const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
        codeBlocks.push(`<pre class="bg-gray-100 p-4 rounded-lg overflow-x-auto my-6"><code class="text-sm font-mono">${code.trim()}</code></pre>`);
        return placeholder;
      });

      // 3. Inline code
      html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">$1</code>');

      // 4. YouTube embeds (before other processing)
      html = html.replace(/(?:^|\s)((?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+))(?:\s|$)/g, 
        (match, fullUrl, videoId, offset, string) => {
          if (!validateYouTubeId(videoId)) {
            return match;
          }
          return `\n<div class="my-6 rounded-lg overflow-hidden shadow-lg"><iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoId}" style="border: 0;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="w-full"></iframe></div>\n`;
        });
      
      // 5. Vimeo embeds
      html = html.replace(/(?:^|\s)((?:https?:\/\/)?(?:www\.)?vimeo\.com\/([0-9]+))(?:\s|$)/g, 
        (match, fullUrl, videoId) => {
          if (!validateVimeoId(videoId)) {
            return match;
          }
          return `\n<div class="my-6 rounded-lg overflow-hidden shadow-lg"><iframe width="100%" height="400" src="https://player.vimeo.com/video/${videoId}" style="border: 0;" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen class="w-full"></iframe></div>\n`;
        });

      // 6. Images (before links)
      html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, 
        '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg shadow-md my-6" loading="lazy" />');
      
      // 7. Links
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:text-primary/80 underline font-medium">$1</a>');

      // 8. Headers (process ### before ## before #)
      html = html.replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold mb-3 mt-6 text-gray-900">$1</h3>');
      html = html.replace(/^## (.+)$/gm, '<h2 class="text-2xl font-semibold mb-4 mt-8 text-gray-900">$1</h2>');
      html = html.replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mb-6 mt-10 text-gray-900">$1</h1>');
      
      // 9. Callouts (before regular quotes)
      html = html.replace(/^> \*\*INFO\*\*:\s*(.+)$/gm, 
        '<div class="bg-blue-50 border-l-4 border-blue-500 p-4 my-6 rounded-r-lg"><div class="flex items-start"><div class="flex-shrink-0 text-2xl mr-3">ℹ️</div><div><h4 class="text-sm font-semibold text-blue-900 mb-1">Information</h4><p class="text-sm text-blue-800">$1</p></div></div></div>');
      html = html.replace(/^> \*\*WARNING\*\*:\s*(.+)$/gm, 
        '<div class="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-6 rounded-r-lg"><div class="flex items-start"><div class="flex-shrink-0 text-2xl mr-3">⚠️</div><div><h4 class="text-sm font-semibold text-yellow-900 mb-1">Attention</h4><p class="text-sm text-yellow-800">$1</p></div></div></div>');
      html = html.replace(/^> \*\*SUCCESS\*\*:\s*(.+)$/gm, 
        '<div class="bg-green-50 border-l-4 border-green-500 p-4 my-6 rounded-r-lg"><div class="flex items-start"><div class="flex-shrink-0 text-2xl mr-3">✅</div><div><h4 class="text-sm font-semibold text-green-900 mb-1">Succès</h4><p class="text-sm text-green-800">$1</p></div></div></div>');
      
      // 10. Regular quotes
      html = html.replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-primary pl-4 italic text-gray-600 my-4 py-2">$1</blockquote>');
      
      // 11. Separators
      html = html.replace(/^---$/gm, '<hr class="my-8 border-gray-200">');
      
      // 12. Task lists (before regular lists)
      html = html.replace(/^- \[ \] (.+)$/gm, 
        '<div class="flex items-center space-x-2 my-2"><input type="checkbox" disabled class="rounded border-gray-300"> <span>$1</span></div>');
      html = html.replace(/^- \[x\] (.+)$/gm, 
        '<div class="flex items-center space-x-2 my-2"><input type="checkbox" checked disabled class="rounded border-gray-300"> <span class="line-through text-gray-500">$1</span></div>');
      
      // 13. Lists
      html = html.replace(/^- (.+)$/gm, '<li class="ml-6 my-1 list-disc">$1</li>');
      html = html.replace(/^[0-9]+\. (.+)$/gm, '<li class="ml-6 my-1 list-decimal">$1</li>');
      
      // 14. Text formatting (bold, italic, underline)
      html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900">$1</strong>');
      html = html.replace(/\*(.+?)\*/g, '<em class="italic">$1</em>');
      html = html.replace(/<u>(.+?)<\/u>/g, '<span class="underline">$1</span>');
      
      // 15. Tables (markdown format)
      html = html.replace(/\n\|(.+)\|\n\|[-:\s|]+\|\n((?:\|.+\|\n?)+)/g, (match, header, rows) => {
        const headerCells = header.split('|').filter((c: string) => c.trim()).map((h: string) => 
          `<th class="px-4 py-2 bg-gray-100 font-semibold text-left border border-gray-300">${h.trim()}</th>`
        ).join('');
        
        const bodyRows = rows.trim().split('\n').map((row: string) => {
          const cells = row.split('|').filter((c: string) => c.trim()).map((cell: string) => 
            `<td class="px-4 py-2 border border-gray-300">${cell.trim()}</td>`
          ).join('');
          return `<tr>${cells}</tr>`;
        }).join('');
        
        return `\n<div class="overflow-x-auto my-6"><table class="min-w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm"><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>\n`;
      });
      
      // 16. Accordions/Details
      html = html.replace(/<details>([\s\S]*?)<\/details>/g, (match, content) => {
        const summaryMatch = content.match(/<summary>(.+?)<\/summary>/);
        const summary = summaryMatch ? summaryMatch[1] : 'Détails';
        const actualContent = content.replace(/<summary>.+?<\/summary>/, '').trim();
        return `<details class="border border-gray-200 rounded-lg p-4 my-6 bg-white"><summary class="font-semibold cursor-pointer hover:text-primary text-gray-900">${summary}</summary><div class="mt-4 pt-4 border-t border-gray-100">${actualContent}</div></details>`;
      });
      
      // 17. Restore code blocks
      codeBlocks.forEach((block, index) => {
        html = html.replace(`__CODE_BLOCK_${index}__`, block);
      });
      
      // 18. Restore math blocks
      mathBlocks.forEach((block, index) => {
        html = html.replace(`__MATH_BLOCK_${index}__`, block);
      });
      
      // 19. Line breaks (convert double newlines to paragraphs, single to <br>)
      html = html.replace(/\n\n+/g, '</p><p class="my-4">');
      html = html.replace(/\n/g, '<br>');
      html = `<p class="my-4">${html}</p>`;

      // Sanitize HTML to prevent XSS attacks
      const sanitizedHtml = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'strong', 'em', 'span', 'code', 'pre', 
                       'ul', 'ol', 'li', 'div', 'a', 'img', 'blockquote', 'hr', 'iframe', 'details', 'summary', 
                       'input', 'label', 'table', 'thead', 'tbody', 'tr', 'th', 'td'],
        ALLOWED_ATTR: ['class', 'href', 'src', 'alt', 'target', 'rel', 'loading', 'width', 'height', 'style', 
                       'allow', 'allowfullscreen', 'type', 'disabled', 'checked'],
        ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allowfullscreen', 'allow', 'loading']
      });

      return (
        <div 
          className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />
      );
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5">
      <Header />
      
      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Roadmap du Projet Gaia
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Découvrez les étapes clés du développement de Gaia, notre solution innovante de reforestation autonome. 
            Suivez notre progression et les prochaines fonctionnalités à venir.
          </p>
        </div>

        {/* Progress Overview */}
        {!loading && roadmapItems.length > 0 && (() => {
          const completedCount = roadmapItems.filter(item => item.status === 'completed').length;
          const inProgressCount = roadmapItems.filter(item => item.status === 'in-progress').length;
          const totalCount = roadmapItems.length;
          const completionPercentage = Math.round((completedCount / totalCount) * 100);
          const progressPercentage = Math.round(((completedCount + inProgressCount * 0.5) / totalCount) * 100);
          
          return (
            <div className="max-w-4xl mx-auto mb-12">
              <Card className="border-2 border-primary/20 shadow-xl bg-gradient-to-br from-white to-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Progression Globale</h3>
                    <span className="text-3xl font-bold text-primary">{progressPercentage}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="relative h-6 bg-gray-200 rounded-full overflow-hidden mb-6">
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-1000 ease-out"
                      style={{ width: `${completionPercentage}%` }}
                    ></div>
                    <div 
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs font-semibold text-white drop-shadow-lg">
                        {completedCount} terminé{completedCount > 1 ? 's' : ''} • {inProgressCount} en cours • {totalCount - completedCount - inProgressCount} planifié{totalCount - completedCount - inProgressCount > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl font-bold text-green-700">{completedCount}</div>
                      <div className="text-xs text-green-600 font-medium">Terminés</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl font-bold text-blue-700">{inProgressCount}</div>
                      <div className="text-xs text-blue-600 font-medium">En cours</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="text-2xl font-bold text-gray-700">{totalCount - completedCount - inProgressCount}</div>
                      <div className="text-xs text-gray-600 font-medium">Planifiés</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })()}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-600 text-lg">Chargement de la roadmap...</p>
            </div>
          </div>
        ) : roadmapItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <Calendar className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Roadmap en construction</h2>
              <p className="text-gray-600">
                Notre roadmap sera bientôt disponible. Revenez prochainement pour découvrir nos plans et objectifs.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/70 to-secondary hidden md:block"></div>
              
              <div className="space-y-16">
                {roadmapItems.map((item, index) => (
                  <div key={item.id} className="relative">
                    {/* Timeline dot with number */}
                    <div className="absolute left-4 w-9 h-9 bg-gradient-to-br from-primary to-primary/80 border-4 border-white rounded-full z-10 shadow-xl hidden md:flex items-center justify-center">
                      <span className="text-white text-sm font-bold">{index + 1}</span>
                    </div>
                    
                    {/* Content Card */}
                    <div className="md:ml-24">
                      <Card className="shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/30 bg-white relative">
                        {/* NEW Badge for first item */}
                        {index === 0 && (
                          <div className="absolute -top-3 -right-3 z-20">
                            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white px-3 py-1 shadow-lg">
                              🆕 Plus récent
                            </Badge>
                          </div>
                        )}
                        <CardHeader className="pb-4">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-2">
                            <div className="flex items-start gap-3 flex-1">
                              <div className="md:hidden flex-shrink-0 w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{index + 1}</span>
                              </div>
                              <CardTitle className="text-2xl font-bold text-gray-900 flex-1">
                                {item.title}
                              </CardTitle>
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <Badge className={`${getStatusColor(item.status)} border font-medium px-3 py-1`}>
                                {getStatusText(item.status)}
                              </Badge>
                              <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                                <Calendar className="w-4 h-4 mr-2" />
                                {item.timeline}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 text-base leading-relaxed mt-2">{item.description}</p>
                        </CardHeader>
                        
                        <CardContent className="pt-0">
                          {/* Markdown Content */}
                          {item.content && (
                            <div className="mb-6 bg-gray-50 rounded-lg p-6 border border-gray-100">
                              {renderMarkdownContent(item.content)}
                            </div>
                          )}
                          
                          {/* Files */}
                          {item.files && item.files.length > 0 && (
                            <div className="space-y-3 pt-4 border-t border-gray-100">
                              <h4 className="font-semibold text-sm text-gray-900 flex items-center">
                                <FileText className="w-4 h-4 mr-2" />
                                Fichiers et ressources associés
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                {item.files.map((fileName, fileIndex) => (
                                  <Button
                                    key={fileIndex}
                                    variant="outline"
                                    size="sm"
                                    className="h-10 px-4 text-sm hover:bg-primary hover:text-white transition-colors"
                                    onClick={() => handleFileClick(fileName)}
                                  >
                                    {fileName.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                                      <ImageIcon className="w-4 h-4 mr-2" />
                                    ) : fileName.match(/\.(mp4|avi|mov|webm)$/i) ? (
                                      <Video className="w-4 h-4 mr-2" />
                                    ) : (
                                      <FileText className="w-4 h-4 mr-2" />
                                    )}
                                    {fileName.split('-').pop() || fileName}
                                    <ExternalLink className="w-3 h-3 ml-2" />
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Roadmap;
