import { useEffect, useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'
import axios from 'axios'
import { useFormik} from 'formik'

import avatar from './avatar.png'
 
const MAX_TWEET_CHAR = 150

const TweetForm = ({ loggedInUser, onSuccess }) => {

  const formik = useFormik({
    onSubmit: async (values, form) => {
      await axios({
        method: 'post',
        url: `${import.meta.env.VITE_API_HOST}/tweets`,
        headers:{
          'authorization': `Bearer ${loggedInUser.accessToken}`
        },
        data: {
          text: values.text
        },
      })

      form.setFieldValue('text', '')
      onSuccess()
    },
    initialValues: {
      text: ''
    }
  })

  function changeText(e) {
    setText(e.target.value)
  }

  return ( 
  <div>
    <div className="flex p-4 space-x-7">
        <img src={avatar} className="w-7"/>
        <h1 className="font-bold text-xl"> Página Inicial </h1>
    </div>
    <form className="pl-12 text-lg flex flex-col" 
    onSubmit={formik.handleSubmit}>
    
    <textarea name="text" 
    value={formik.values.text} 
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    disabled={formik.isSubmitting}
    placeholder="O que está acontecendo?" className="bg-transparent outline-none" />



    <div className="flex justify-end items-center space-x-3">
      <span className="text-sm">
      <span>{formik.values.text.length}</span><span className="text-superBlue">/{MAX_TWEET_CHAR}</span>
      </span>
      <button 
      type="submit"
      disabled={formik.values.text.length > MAX_TWEET_CHAR || formik.isSubmitting }
      className="bg-superBlue px-5 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed">Tweet</button>
    </div>

    </form>

  </div>
  )
}
 

const Tweet = ({name, username, avatar, children}) => {
  return (
    <div className="flex space-x-3 border-b border-silver p-4"> 
      <div> 
          <img src={avatar}/> 
      </div>
    
      <div className="space-y-1"> 
        <span className="font-bold text-sm">{name} </span> {'  '}
        <span className="text-sm text-silver">@{username}</span>
        <p> {children} </p>

        <div className="flex space-x-1 text-silver text-sm items-center">
          <HeartIcon className="w-6 stroke-1"/>
          <span>1.2k</span>

        </div>
      </div>

    </div>
  ) 
}

export function Home({ loggedInUser }) {
  const [data, setData] = useState([])


  async function getData() {
    const res = await axios.get(`${import.meta.env.VITE_API_HOST}/tweets`, {
      headers: {
        'authorization': `Bearer ${loggedInUser.accessToken}`
      }
    })
    setData(res.data)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <TweetForm loggedInUser={loggedInUser} onSuccess={getData} />
      <div>
        {data.length && data.map(tweet => (
          <Tweet key={tweet.id} name={tweet.user.name} username={tweet.user.username} avatar={avatar}>
            {tweet.text}
          </Tweet>
        ))}
      </div>
    </>
  )
}