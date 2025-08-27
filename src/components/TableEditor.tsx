import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  Plus, 
  Minus, 
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Settings,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic
} from 'lucide-react';
import { toast } from 'sonner';

interface TableData {
  headers: string[];
  rows: string[][];
  styling?: {
    headerStyle?: string;
    cellStyle?: string;
    alternateRows?: boolean;
    borderStyle?: 'none' | 'light' | 'heavy';
  };
}

interface TableEditorProps {
  data: TableData;
  onChange: (data: TableData) => void;
}

const TableEditor: React.FC<TableEditorProps> = ({ data, onChange }) => {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  const addColumn = () => {
    const newData = {
      ...data,
      headers: [...data.headers, `Colonne ${data.headers.length + 1}`],
      rows: data.rows.map(row => [...row, ''])
    };
    onChange(newData);
    toast.success('Colonne ajoutée');
  };

  const removeColumn = (colIndex: number) => {
    if (data.headers.length <= 1) {
      toast.error('Le tableau doit avoir au moins une colonne');
      return;
    }
    const newData = {
      ...data,
      headers: data.headers.filter((_, i) => i !== colIndex),
      rows: data.rows.map(row => row.filter((_, i) => i !== colIndex))
    };
    onChange(newData);
    toast.success('Colonne supprimée');
  };

  const addRow = () => {
    const newRow = new Array(data.headers.length).fill('');
    const newData = {
      ...data,
      rows: [...data.rows, newRow]
    };
    onChange(newData);
    toast.success('Ligne ajoutée');
  };

  const removeRow = (rowIndex: number) => {
    if (data.rows.length <= 1) {
      toast.error('Le tableau doit avoir au moins une ligne');
      return;
    }
    const newData = {
      ...data,
      rows: data.rows.filter((_, i) => i !== rowIndex)
    };
    onChange(newData);
    toast.success('Ligne supprimée');
  };

  const updateHeader = (index: number, value: string) => {
    const newHeaders = [...data.headers];
    newHeaders[index] = value;
    onChange({ ...data, headers: newHeaders });
  };

  const updateCell = (rowIndex: number, colIndex: number, value: string) => {
    const newRows = [...data.rows];
    newRows[rowIndex][colIndex] = value;
    onChange({ ...data, rows: newRows });
  };

  const moveRow = (rowIndex: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? rowIndex - 1 : rowIndex + 1;
    if (newIndex < 0 || newIndex >= data.rows.length) return;

    const newRows = [...data.rows];
    [newRows[rowIndex], newRows[newIndex]] = [newRows[newIndex], newRows[rowIndex]];
    onChange({ ...data, rows: newRows });
    toast.success(`Ligne déplacée vers le ${direction === 'up' ? 'haut' : 'bas'}`);
  };

  const moveColumn = (colIndex: number, direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? colIndex - 1 : colIndex + 1;
    if (newIndex < 0 || newIndex >= data.headers.length) return;

    const newHeaders = [...data.headers];
    [newHeaders[colIndex], newHeaders[newIndex]] = [newHeaders[newIndex], newHeaders[colIndex]];

    const newRows = data.rows.map(row => {
      const newRow = [...row];
      [newRow[colIndex], newRow[newIndex]] = [newRow[newIndex], newRow[colIndex]];
      return newRow;
    });

    onChange({ ...data, headers: newHeaders, rows: newRows });
    toast.success(`Colonne déplacée vers la ${direction === 'left' ? 'gauche' : 'droite'}`);
  };

  const updateStyling = (key: string, value: any) => {
    const newStyling = { ...(data.styling || {}), [key]: value };
    onChange({ ...data, styling: newStyling });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <Settings className="h-5 w-5" />
            <span>Éditeur de Tableau Avancé</span>
          </CardTitle>
          <div className="flex space-x-2">
            <Badge variant="outline">{data.headers.length} colonnes</Badge>
            <Badge variant="outline">{data.rows.length} lignes</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Styling Options */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center space-x-2">
              <Palette className="h-4 w-4" />
              <span>Options de Style</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Style des bordures</Label>
                <Select
                  value={data.styling?.borderStyle || 'light'}
                  onValueChange={(value) => updateStyling('borderStyle', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Aucune</SelectItem>
                    <SelectItem value="light">Légères</SelectItem>
                    <SelectItem value="heavy">Épaisses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Lignes alternées</Label>
                <Select
                  value={data.styling?.alternateRows ? 'yes' : 'no'}
                  onValueChange={(value) => updateStyling('alternateRows', value === 'yes')}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">Non</SelectItem>
                    <SelectItem value="yes">Oui</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Style en-tête</Label>
                <Select
                  value={data.styling?.headerStyle || 'default'}
                  onValueChange={(value) => updateStyling('headerStyle', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Défaut</SelectItem>
                    <SelectItem value="bold">Gras</SelectItem>
                    <SelectItem value="colored">Coloré</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Controls */}
        <div className="flex flex-wrap gap-2 justify-between items-center">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={addColumn}>
              <Plus className="h-4 w-4 mr-2" />
              Colonne
            </Button>
            <Button variant="outline" size="sm" onClick={addRow}>
              <Plus className="h-4 w-4 mr-2" />
              Ligne
            </Button>
          </div>
          {selectedCell && (
            <div className="flex space-x-1">
              <Button variant="outline" size="sm" onClick={() => moveColumn(selectedCell.col, 'left')} disabled={selectedCell.col === 0}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => moveColumn(selectedCell.col, 'right')} disabled={selectedCell.col === data.headers.length - 1}>
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => moveRow(selectedCell.row, 'up')} disabled={selectedCell.row === 0}>
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => moveRow(selectedCell.row, 'down')} disabled={selectedCell.row === data.rows.length - 1}>
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <Separator />

        {/* Table Editor */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 rounded-lg">
            {/* Headers */}
            <thead>
              <tr className={`${data.styling?.headerStyle === 'colored' ? 'bg-primary/10' : 'bg-gray-50'}`}>
                {data.headers.map((header, colIndex) => (
                  <th key={colIndex} className="relative border border-gray-300 p-2">
                    <div className="flex items-center space-x-2">
                      <Input
                        value={header}
                        onChange={(e) => updateHeader(colIndex, e.target.value)}
                        className={`text-center font-semibold ${data.styling?.headerStyle === 'bold' ? 'font-bold' : ''}`}
                        placeholder={`Colonne ${colIndex + 1}`}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeColumn(colIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            {/* Rows */}
            <tbody>
              {data.rows.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className={`hover:bg-gray-50 transition-colors ${
                    data.styling?.alternateRows && rowIndex % 2 === 1 ? 'bg-gray-25' : ''
                  }`}
                >
                  {row.map((cell, colIndex) => (
                    <td 
                      key={colIndex} 
                      className={`border border-gray-300 p-1 ${
                        selectedCell?.row === rowIndex && selectedCell?.col === colIndex 
                          ? 'ring-2 ring-primary' 
                          : ''
                      }`}
                      onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                    >
                      <div className="flex items-center space-x-2">
                        <Input
                          value={cell}
                          onChange={(e) => updateCell(rowIndex, colIndex, e.target.value)}
                          className="border-none shadow-none focus-visible:ring-0"
                          placeholder="Cellule vide"
                        />
                        {colIndex === 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeRow(rowIndex);
                            }}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Aperçu du Rendu Final</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className={`w-full border-collapse ${
                data.styling?.borderStyle === 'none' ? '' :
                data.styling?.borderStyle === 'heavy' ? 'border-2 border-gray-800' : 'border border-gray-300'
              } rounded-lg`}>
                <thead>
                  <tr className={`${
                    data.styling?.headerStyle === 'colored' ? 'bg-primary/10' :
                    data.styling?.headerStyle === 'bold' ? 'bg-gray-100' : 'bg-gray-50'
                  }`}>
                    {data.headers.map((header, index) => (
                      <th key={index} className={`${
                        data.styling?.borderStyle === 'none' ? '' :
                        data.styling?.borderStyle === 'heavy' ? 'border-2 border-gray-600' : 'border border-gray-300'
                      } px-4 py-3 text-left ${
                        data.styling?.headerStyle === 'bold' ? 'font-bold' : 'font-semibold'
                      } text-primary`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} className={`hover:bg-gray-50 transition-colors ${
                      data.styling?.alternateRows && rowIndex % 2 === 1 ? 'bg-gray-25' : ''
                    }`}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className={`${
                          data.styling?.borderStyle === 'none' ? '' :
                          data.styling?.borderStyle === 'heavy' ? 'border-2 border-gray-400' : 'border border-gray-300'
                        } px-4 py-3`}>
                          {cell || <span className="text-gray-400 italic">Vide</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Total cellules: {data.headers.length * data.rows.length}</span>
          <span>Cellules remplies: {data.rows.flat().filter(cell => cell.trim()).length}</span>
          <span>Taille: {data.headers.length}×{data.rows.length}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TableEditor;