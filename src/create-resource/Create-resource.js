import {useEffect, useState} from "react";
import './Create-resource.css'
import {useResource} from "../contexts/ResourceListContext";
import api from "../api";

function CreateResource() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [resourceName, setResourceName] = useState('');
    const {resourceList, setResourceList} = useResource();
    const handleClick = () => {
        setIsFormVisible(prevState => !prevState);
    }
    const handleChange = (event) => {
        setResourceName(event.target.value);
        console.log(resourceName)
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        setResourceList(prevList => [...prevList, resourceName]);
        api.post('/create-resource', {name: resourceName})
            .then(response => {
                console.debug('added resource to db')
            })
            .catch(error => {
                console.error(error)
                console.warn(process.env.API_BASE_URL)
            });
        setResourceName('');
        setIsFormVisible(false);
    }

    useEffect(() => {
        // Fetch resources from server on component mount
        api.get('/resources')
            .then(response => {
                setResourceList(response.data)
            })
            .catch(error => {
                console.error(error)
            });
    }, [setResourceList]) // Empty dependency array means this effect runs once on mount

    return (
        <div>
            <div className="create-resource">
                <button className="btn btn-primary" onClick={handleClick}>
                    <i className="fa fa-plus-circle"></i> {'Create resource type'}
                </button>
                {isFormVisible && (
                    <form onSubmit={handleSubmit}>
                        <h2>New Resource</h2>
                        <input type="text" className="resource-name" placeholder="New Resource" onChange={handleChange}
                               required/>
                        <div className="submit-btn">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </form>
                )}
            </div>
            <div>
                <h5 style={{margin: '10px'}}>Available resources:</h5>
                <table className="table table-bordered" style={{margin: '10px'}}>
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Resource</th>
                    </tr>
                    </thead>
                    <tbody>
                    {resourceList.map((resource, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{resource.name}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CreateResource
