const style = {}

export function PostComponent({name, roll, time,discription}){
    return <div>
        <b>{name}</b>
        <b>{roll}</b>
    <div>
        <i>{time}</i>
        <b>{discription}</b>
    </div>
    </div>
}

