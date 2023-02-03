

function Article(props:any) {
  const {title}= props.params;
  console.log(props.params.id)
  
  return (
    <div>
          <h1>Aqui el primer post
          </h1>
      <h1>{title}</h1>
    </div>
  )
}

export default Article