import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'


const Input = (props) => (
    <input {...props} className="w-full p-4 bg-transparent border-2 border-silver rounded-xl text-lg outline-none focus:border-platinum" />)


const validationSchema = yup.object({
    name: yup.string().required('Digite seu nome'),
    username: yup.string().required('Digite um nome de usuário'),
    email: yup.string().required('Digite seu email').email(),
    password: yup.string().required('Digite sua senha')
})

export function Signup({ signInUser }){
        const formik = useFormik({
            onSubmit: async values => {
                const res = await axios.post(`${import.meta.env.VITE_API_HOST}/signup`, {
                    auth:{
                        email: values.email,
                        name: values.name,
                        username: values.username,
                        password: values.password
                    }
                })
    
                signInUser(res.data)
            },
            initialValues:{
                email:'',
                password:'',
            },
            validateOnMount: true,
            validationSchema,
        })
    

    return (
        <>
        <div className="h-full flex flex-col justify-center p-12 space-y-6">
                <h1 className="text-platinum text-3xl font-bold">Crie uma conta</h1>
                <form className='space-y-6' onSubmit={formik.handleSubmit}>

                <div className="space-y-2">
                        <Input 
                                type="text"
                                name="Name"
                                placeholder="Nome"
                                value={formik.values.nome}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur} 
                                // disabled={formik.isSubmitting}
                        />
                        {(formik.touched.name && formik.errors.name) && (
                        <div className="text-red-500 text-sm">{formik.errors.name}</div>
                    )}
                    </div>

                    <div className="space-y-2">
                        <Input 
                                type="text"
                                name="username"
                                placeholder="Nome de usuário"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}  
                                // disabled={formik.isSubmitting}
                        />
                         {(formik.touched.username && formik.errors.username) && ( 
                          <div className="text-red-500 text-sm">{formik.errors.username}</div> )}
                    </div>


                    <div className="space-y-2">
                        <Input 
                                type="text"
                                name="email"
                                placeholder="E-mail"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}  
                                // disabled={formik.isSubmitting}
                        />
                         {(formik.touched.email && formik.errors.email) && (
                             <div className="text-red-500 text-sm">{formik.errors.email}</div>)}
                    </div>

                    <div className="space-y-2">
                        <Input 
                                type="password"
                                name="password"
                                placeholder="Senha" 
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}  
                                // disabled={formik.isSubmitting}
                        />
                         {(formik.touched.password && formik.errors.password) && 
                            (<div className='text-red-500 text-sm'>{formik.errors.password}</div>)}
                    </div>

                    <button type="submit" 
                    className="bg-superBlue py-4 rounded-full w-full my-6 font-bold text-md disabled:cursor-not-allowed disabled:opacity-30"
                    disabled={formik.isSubmitting || !formik.isValid}

                    > {formik.isSubmitting ? 'Cadastrando...' : 'Cadastrar'} </button>
                </form>
    
            <span className="text-silver text-sm text-center"> Já tem uma conta? <a href="/login" className="text-superblue"> Acesse  </a></span>
        </div>
        </>
    )
}