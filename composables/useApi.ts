import {
    ref
  } from "vue";
  import Swal from "sweetalert2";
  import {
    useRouter,
    type Router
  } from "vue-router";
  import {
    useCookie,
    type CookieRef
  } from "nuxt/app";

  
  export function useAPI(){
    const BASE_URL: string = import.meta.env.NUXT_PUBLIC_API_URL;
    const token: CookieRef<string | null> = useCookie<string | null>('Robert_token');
    const router: Router = useRouter();
    const isLoading: Ref<boolean> = ref<boolean>(false);
  
    const postApi = (method_type: string, endpoint: string, formData?: any): Promise<object> => {
      isLoading.value = true;
  
      return fetch(`${BASE_URL}/${endpoint}`, {
        method: method_type,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`,
        },
        body: JSON.stringify(formData)
      })
      .then((res_err) => {
        if(res_err.status === 401){
          token.value = null;
          router.push('/signin');
          return;
        }
        return res_err.json();
      })
      .then((result) => {
        if(!result.error){
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'success',
            title: result.message,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
  
          return result;
        }
        else{
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: result.message,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          return null;
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        return null;
      })
      .finally(() => {
        isLoading.value = false;
      });
    };
  
    const fetchApi = async (method_type: string, endpoint: string): Promise<object | any> => {
      isLoading.value = true;
  
      try{
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
          method: method_type,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`,
          }
        });
  
        if(response.status === 401){
          token.value = null;
          router.push('/signin');
          return;
        }
  
        const result: any = await response.json();
        if(result.error){
          Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'error',
            title: result.message,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
        }
  
        return result;
      }
      catch(error){
        console.error('Error:', error);
        isLoading.value = false;
      }
      finally{
        isLoading.value = false;
      }
    };
  
    return {
      postApi,
      fetchApi,
      isLoading
    };
  }

