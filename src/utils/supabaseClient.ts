// src/utils/supabaseClient.ts
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

/**
 * Uploads an array of File objects to the Supabase 'review-images' bucket.
 * Returns an array of public URLs for the uploaded files.
 */
export async function uploadImages(files: File[]): Promise<string[]> {
  const uploadedUrls: string[] = []

  for (const file of files) {
    const filePath = `${Date.now()}-${file.name}`
    const { error } = await supabase.storage.from('review-images').upload(filePath, file)

    if (error) {
      console.error('Upload error:', error.message)
      continue
    }

    const { data } = supabase.storage.from('review-images').getPublicUrl(filePath)

    if (data?.publicUrl) {
      uploadedUrls.push(data.publicUrl)
    }
  }

  return uploadedUrls
}