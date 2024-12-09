import react, { useState } from "react"


    //Tener un estado que nos permita controlar el formulario
    //state = {email: '', password: '', name: ''}
    //Cada vez que el usuario ingrese un valor en algun input de nuestro form, DEBE CAMBIAR tambien el objeto state

    //Sabemos que debemos usar onChange


const useForm =  (initialForm) => {
    const [formState, setFormState] = useState(initialForm)
    

    const handleChange = (event) => {
        // event.target Que es? Es el elemnto HTML que emitio el evento
        // event.target.value Que es? El valor del elemento HTML (El input)

        const field_name = event.target.name
        const field_value = event.target.value

        //La funcion setter de mi estado me permite modoficar el estado y re renderizar el componente
        //Opcionalmente yo le puedo pasar una callback, la misma sera invocada y el valor de retorno de la callback sera el nuevo valor de mi estado
        //El parametro de la callback es el prevState o el estado previo de ese estado (osea el valor actual)
        setFormState((prevFormState) => {
            return { ...prevFormState, [field_name]: field_value }
        })
    }

    const handleChangeImage = (event, field_name) =>{
        const FILE_MB_LIMIT = 2

        //Llamo a la primera imagen cargada en este imput
        const file = event.target.files[0]

        if(file && file.size > FILE_MB_LIMIT * 1024 * 1024){
            alert('el archivo es muy pesado')
        }
    
        const reader = new FileReader()
        //Es un evento que se va a activar cuando se termine de cargar el archivo
        reader.onloadend = () =>{
            const image_base64 = reader.result
            setFormState(
                (prevFormState) =>{
                    return {...prevFormState, [field_name]: image_base64}
                }
            ) //El resultado de la lectura del archivo y esta en base64
        }

        if(file){
            //Read as data URL, lee el archivo y transforma a base64
            reader.readAsDataURL(file)
        }
    }

    return {
        formState: formState,
        handleChange,
        handleChangeImage
    }
}



export default useForm