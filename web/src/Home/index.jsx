import { useState } from 'react'
import { HeartIcon } from '@heroicons/react/outline'

const MAX_TWEET_CHAR = 150

const TweetForm = () => {

  const [text, setText] = useState('')
  
  let changeText = (e) => {
    setText(e.target.value)
  }

  return ( 
  <div>
    <div className="flex p-4 space-x-7">
        <img src="https://images2.imgbox.com/14/5b/bODspmpN_o.png" className="w-7"/>
        <h1 className="font-bold text-xl"> Página Inicial </h1>
    </div>
    <form className="pl-12 text-lg flex flex-col">
    <textarea name="text" value={text} 
    onChange={changeText} 
    placeholder="O que está acontecendo?" className="bg-transparent outline-none" />



    <div className="flex justify-end items-center space-x-3">
      <span className="text-sm">
        <span>{text.length}/</span><span className="text-superBlue">{MAX_TWEET_CHAR}</span>
      </span>
      <button 
      disabled={text.length > MAX_TWEET_CHAR }
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
          icone de core 
          1.5k

        </div>
      </div>

    </div>
  ) 
}


export const Home = () => {
  return (
    <>
    <div> 
      <TweetForm />
      <Tweet name="Nome da pessoa" username="Olaaa" avatar="https://images2.imgbox.com/14/5b/bODspmpN_o.png">
        Tweet aqui
      </Tweet>
    </div>
    </>
  )
}


 