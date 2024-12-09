import React from 'react'
import useForm from '../Hooks/useForm'

const Form = ({children, action, form_fields, initial_state_form}) => {
    //children hace referencia a el contenido encerrado como hijo de nuestro componente
    const { formState, handleChange, handleChangeImage } = useForm(initial_state_form)

    const handleSubmit = (e) =>{
        e.preventDefault()
        action(formState)
    }

    return (
        <form onSubmit={handleSubmit}>
            <FieldList form_fields={form_fields} handleChange={handleChange} handleChangeImage={handleChangeImage} form_state={formState}/>
            {children}
        </form>
    )
}

const FieldList = ({form_fields, handleChange, handleChangeImage , form_state}) =>{
    return(
        form_fields.map((field, index)=>{
            return(
                <Field key={index + field.field_data_props.name} handleChange={handleChange} handleChangeImage={handleChangeImage} field={field} state_value={form_state[field.field_data_props.name]}/>
            )
        })
    )
}


//Const InputSelected = ({type}) =>{
//    const INPUTS= {
//          "INPUT": <input/>
//          "TEXTAREA": <textarea/>
//      }
//      return INPUTS[type]
//    }
//
//    <InputSelected type = 'INPUT'/>

const Field = ({field, handleChange, state_value, handleChangeImage}) => {
    return(             
        <div {...field.field_container_props}>
            {field.label_text && <label>{field.label_text}</label>}
            <>
                {
                    field.field_component === 'INPUT'
                    ?<input 
                    {...field.field_data_props} 
                    onChange= {
                        field.field_data_props.id === 'image'
                        ? (event) => handleChangeImage(event, field.field_data_props.name)
                        : handleChange
                    } //(evento) => handleSubmitImage(evento, 'image_base64')
                    state_value={state_value}/>
                    : <textarea></textarea>
                }
            </>
        </div>
    )
}

export default Form