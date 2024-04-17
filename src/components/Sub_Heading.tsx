import '../styles/Sub_Heading.css'

export function Subheading({title}:{title: string})
{
    return(
        <div className="container-fluid d-flex header-bottom-container align-items-center justify-content-center">
            <div className="text-white fs-1 fw-bold">
            {title}
            </div>
        </div>
    );
}
