import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function Header(props) { // 사용자 정의 태그를 만들때는 항상 대문자로 시작해야한다!(사용자 정의태그 = 컴포넌트)
    // {} 중괄호로 감싸면 표현식으로 인식되어서 props.title이 출력되는게아니라 그에 담긴 값인 "REACT"가 출력된다.
    return  <header>
                <h1><a href={"/"} onClick={event => {
                    event.preventDefault();
                    props.onChangeMode();
                }}>{props.title}</a></h1>
            </header>
}

function Nav(props) {
    // const lis = [
    //     <li><a href={"/read/1"}>html</a> </li>,
    //     <li><a href={"/read/2"}>css</a> </li>,
    //     <li><a href={"/read/3"}>js</a> </li>
    // ]

    const lis2 = []
    for(let i = 0 ; i < props.topics.length; i++) {
        let t = props.topics[i]
        lis2.push(<li key={t.id}>
            <a id={t.id} href={'/read/'+t.id} onClick={event => {
                    event.preventDefault();
                    props.onChangeMode(Number(event.target.id));
                }}>{t.title}
            </a>
        </li>)
    }
    return  <nav>
                {/*<ol>*/}
                {/*    {lis}*/}
                {/*</ol>*/}
                <ol>
                    {lis2}
                </ol>
            </nav>
}

function Article(props) {
    return  <article>
                <h2>{props.title}</h2>
                {props.body}
            </article>
}

function Create(props) {
    return  <article>
                <h2>CREATE</h2>
                <form onSubmit={event => {
                    event.preventDefault();
                    const title = event.target.title.value; // event.target => form태그(submit버튼을 클릭했을때 일어나는 이벤트의 타겟이니까)
                    const body = event.target.body.value;
                    props.onCreate(title, body);
                }}>
                    <p><input type="text" name="title" placeholder="title"></input></p>
                    <p><textarea name="body" placeholder="body"></textarea></p>
                    <p><input type="submit" value="Create"></input></p>
                </form>
            </article>
}

function App() {
    const [mode, setMode] = useState('WELCOME');
    const [id, setId] = useState(null);
    const [nextId, setNextId] = useState(4);
    const [topics,setTopics] = useState([
        {id:1, title:'html', body:'html is ...'},
        {id:2, title:'css', body:'css is ...'},
        {id:3, title:'js', body:'javascript is ...'}
    ]);
    let content = null;
    if(mode === 'WELCOME') {
        content = <Article title={"Welcome"} body={"Hello, Web"}></Article>
    } else if(mode === 'READ') {
        let title, body = null;
        for(let i = 0 ; i < topics.length ; i++) {
            if(topics[i].id === id) {
                title = topics[i].title;
                body = topics[i].body;
            }
        }
        content = <Article title={title} body={body}></Article>
    } else if(mode === 'CREATE') {
        content = <Create onCreate={(_title, _body) => {
            const newTopic = {id: nextId,title:_title, body:_body}
            const newTopics = [...topics];
            newTopics.push(newTopic);
            setTopics(newTopics);

            setMode('READ'); // 추가한 내용의 상세보기로 이동
            setId(nextId);
            setNextId(nextId+1);
        }}></Create>
    }

    return (
        <div>
            <Header title={"WEB"} onChangeMode={() => {
                setMode('WELCOME');
            }}></Header>

            <Nav topics={topics} onChangeMode={(_id)=>{
                setMode('READ');
                setId(_id);
            }}></Nav>

            {/*<Article title={"Welcome"} body={"Hello,Web"}></Article>*/}
            {/*<Article title={"Hi"} body={"Hello,react"}></Article>*/}
            {content}
            <a href={"/create"} onClick={event => {
                event.preventDefault();
                setMode('CREATE');
            }
            }>Create</a>
        </div>
    );
}

export default App;
