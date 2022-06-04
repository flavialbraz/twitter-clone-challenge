import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'


const Input = (props) => (
    <input {...props} className="w-full p-4 bg-transparent border-2 border-silver rounded-xl text-lg outline-none focus:border-platinum" />)


const validationSchema = yup.object({
    email: yup.string().required('Digite seu email').email(),
    password: yup.string().required('Digite sua senha')
})

export default function Login({ signInUser }){

        const formik = useFormik({
            onSubmit: async values => {
                const res = await axios.get('http://localhost:5000/login', {
                    auth:{
                        username: values.email,
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
                <h1 className="text-platinum text-3xl font-bold">Acesse sua conta</h1>
                <form className='space-y-6' onSubmit={formik.handleSubmit}>

                    <div className="space-y-2">
                        <Input 
                                type="text"
                                name="email"
                                placeholder="E-mail"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}  
                        />
                         {(formik.touched.email && formik.errors.email) && 
                            (<div className='text-red-500 text-sm'> Digite um e-mail válido.
                                {/* {formik.errors.email} */}
                                </div>)}
                    </div>

                    <div className="space-y-2">
                        <Input 
                                type="password"
                                name="password"
                                placeholder="Senha" 
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}  
                        />
                         {(formik.touched.password && formik.errors.password) && 
                            (<div className='text-red-500 text-sm'>{formik.errors.password}</div>)}
                    </div>

                    <button type="submit" 
                    className="bg-superBlue py-4 rounded-full w-full my-6 font-bold text-md disabled:cursor-not-allowed disabled:opacity-30"
                    disabled={!formik.isValid || formik.isSubmitting}

                    > {formik.isSubmitting ? 'Enviando...' : 'Entrar'} </button>
                </form>
    
            <span className="text-silver text-sm text-center"> Não tem uma conta? <a href="/signup" className="text-birdBlue"> Inscreva-se </a></span>
        </div>
        </>
    )
}