import { http } from '@tauri-apps/api';

export const predictImage = async (file:File) => {
  const formData = new FormData();
  formData.append('file',file)
  return await http.fetch('http://localhost:5000/image',{
    method:'POST',
    headers:{
      'content-type': 'multipart/form-data'
    },
    body: http.Body.form(formData) 
  })
}
