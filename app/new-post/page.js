import PostForm from '@/components/post-form';
import { uploadImage } from '@/lib/cloudinary';
import { storePost } from '@/lib/posts';
import { redirect } from 'next/navigation';

export default function NewPostPage() {
 
   
async function createPost(prevState,formData) {

  // https://www.udemy.com/course/nextjs-react-the-complete-guide/learn/lecture/43356962#overview

  // we can copy this code in differnet cmponent and use server
    "use server";
    const data= {
      title: formData.get('title'),
      imageUrl : formData.get('image'),
      content : formData.get('content'),
      userId: 1
    }
   
    let errors= [];

    if (!data.title || data.title.trim().length ===0 ){
      errors.push("Title is required")
    }

    if (!data.content || data.content.trim().length ===0 ){
      errors.push("Content is required")
    }

    if (!data.imageUrl || data.imageUrl.size === 0){
      errors.push("Image is required")
    }

    if (errors.length > 0) {
      return { errors }
    }
    let imageUrl;
    try {
      
      imageUrl =  await uploadImage(data.imageUrl);
    } catch (error) {
      throw new Error('Image Upload Error')
    }
    data.imageUrl = imageUrl;
    await storePost(data);
    redirect('/feed');
  }

  return <PostForm action={createPost}/> 
  
}
