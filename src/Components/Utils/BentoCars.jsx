
const BentoCards = ({src, title, description}) => {
    return (
      <div className="relative bg-white size-full ">
        <img
        src={src}
        
        className="absolute left-0 top-0 size-full  object-cover object-center "
        />
        <div className="relative flex size-full flex-col justify-between rounded-2xl p-10 text-blue-100">
          <h1 className="bento-title special-font">
            {title}
          </h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs">{description}</p>
          )}
        </div>
        
      </div>
    )
  }
  
  export default BentoCards
  