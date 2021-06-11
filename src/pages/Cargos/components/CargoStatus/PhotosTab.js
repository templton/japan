export const PhotosTab = (props) => {
    const { photos } = props;
    return (
        <div>
            {
                photos && photos.length && photos.map((item, index)=>{
                    return (
                        <div key={index}>
                            <label>{item.title}</label>
                            <img height="100px" src={item.url} alt={item.title}/>
                        </div>
                    );
                })
            }
        </div>
    );
}
