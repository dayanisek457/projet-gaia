import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { s3Client, BUCKET_NAME } from '@/lib/s3'
import { ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { User, Session } from '@supabase/supabase-js'
import { Shield, Upload, Trash2, FileText, LogOut } from 'lucide-react'

interface FileObject {
  key: string
  lastModified?: Date
  size?: number
}

const AdminAccess = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<FileObject[]>([])
  const [uploading, setUploading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session) {
        loadFiles()
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      })
      if (error) {
        console.error('Error signing in with Google:', error.message)
      }
    } catch (error) {
      console.error('Error signing in:', error)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    }
    setFiles([])
    setOpen(false)
  }

  const loadFiles = async () => {
    try {
      const command = new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
      })
      const response = await s3Client.send(command)
      
      if (response.Contents) {
        const fileList = response.Contents.map(obj => ({
          key: obj.Key || '',
          lastModified: obj.LastModified,
          size: obj.Size,
        }))
        setFiles(fileList)
      }
    } catch (error) {
      console.error('Error loading files:', error)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const command = new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: file,
        ContentType: file.type,
      })
      
      await s3Client.send(command)
      await loadFiles()
    } catch (error) {
      console.error('Error uploading file:', error)
    } finally {
      setUploading(false)
    }
  }

  const deleteFile = async (key: string) => {
    try {
      const command = new DeleteObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      })
      
      await s3Client.send(command)
      await loadFiles()
    } catch (error) {
      console.error('Error deleting file:', error)
    }
  }

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '0 B'
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-background/60 hover:text-primary hover:bg-primary/10 transition-colors"
        >
          <Shield className="h-4 w-4 mr-2" />
          Accès Administrateur
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            Accès Administrateur
          </DialogTitle>
        </DialogHeader>

        {!user ? (
          <Card>
            <CardHeader>
              <CardTitle>Authentification requise</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                Connectez-vous avec votre compte Google pour accéder à l'interface d'administration.
              </p>
              <Button onClick={signInWithGoogle} disabled={loading} className="w-full">
                {loading ? 'Connexion...' : 'Se connecter avec Google'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* User Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Bienvenue, {user.user_metadata?.name || user.email}</CardTitle>
                  <Button variant="outline" size="sm" onClick={signOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Email: {user.email}
                </p>
              </CardContent>
            </Card>

            {/* File Management */}
            <Card>
              <CardHeader>
                <CardTitle>Gestion des fichiers S3</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Upload Section */}
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Sélectionnez un fichier à télécharger dans le bucket GAIA
                  </p>
                  <Input
                    type="file"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="max-w-xs mx-auto"
                  />
                  {uploading && (
                    <p className="text-sm text-primary mt-2">Téléchargement en cours...</p>
                  )}
                </div>

                {/* Files List */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Fichiers ({files.length})</h3>
                    <Button variant="outline" size="sm" onClick={loadFiles}>
                      Actualiser
                    </Button>
                  </div>
                  
                  {files.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-8">
                      Aucun fichier trouvé dans le bucket.
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50"
                        >
                          <div className="flex items-center space-x-3 flex-1">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="text-sm font-medium truncate">{file.key}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)} • {file.lastModified?.toLocaleString() || 'Date inconnue'}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteFile(file.key)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AdminAccess