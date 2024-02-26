import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";


type Props = {
  title?: string
}


const NoMatch:React.FC<Props> = ({title}) => {

  const baseUrl = useContext(AppContext)?.baseUrl;

    return (
        <div>
          <h2>{title}</h2>
          <p>
            <Link to={`${baseUrl}`}>Go to the home page</Link>
          </p>
        </div>
      );
}

export default NoMatch;