import React,{useState,useEffect,useCallback} from 'react';
import defaultDataset from "./dataset";
import {AnswersList,Chats} from "./components/index";
import './assets/styles/style.css'
import FormDialog from "./components/Forms/FormDialog";

const App =()=>{
  const [answers,setAnswers]=useState([]);
  const [chats,setChats]=useState([]);
  const [currentId,setCurrentId]=useState("init");
  const [dataset,setDataset]=useState({});
  const [open,setOpen]=useState(false);

  const displayNextQuestion=(nextQuestionId,nextDataset)=>{
    addChats({
      text:nextDataset.question,
      type:'question'
    })

    setAnswers(nextDataset.answers)
    setCurrentId(nextQuestionId)
  }

  const selectAnswer = (selectedAnswer,nextQuestionId) =>{
    switch(true){
      case(/^https:*/.test(nextQuestionId)):
        const a =document.createElement('a');
        a.href=nextQuestionId;
        a.target='_brank;'
        a.click();
        break;
      case(nextQuestionId==='contact'):
        handleClickOpen();
        break;
      default:    
        addChats({
          text:selectedAnswer,
          type:'answer'
        })

        setTimeout(()=>displayNextQuestion(nextQuestionId,dataset[nextQuestionId]),500);
        break;
    }
  }

  const addChats=(chat)=>{
    setChats(prevChats=>{
      return[...prevChats,chat]
    })
  }

  const handleClickOpen = useCallback(() => {
    setOpen(true)
  },[setOpen]);

  const handleClose = useCallback(() => {
      setOpen(false)
  },[setOpen]);



  useEffect(()=>{
    setDataset(defaultDataset)
    displayNextQuestion(currentId,defaultDataset[currentId])
  },[])

  useEffect(()=>{
    const scrollArea=document.getElementById('scroll-area')
    if(scrollArea){
      scrollArea.scrollTop=scrollArea.scrollHeight
    }
  })

  return (
    <section className="c-section">
      <div className="c-box">
        <Chats chats={chats} />
        <AnswersList answers={answers} select={selectAnswer} />
        <FormDialog open={open} handleClose={handleClose} />
      </div>
    </section>
  );
}

export default App