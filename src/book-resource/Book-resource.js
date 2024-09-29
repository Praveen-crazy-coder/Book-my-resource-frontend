import { useFormik } from 'formik';
import { useState } from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

function BookResource() {
    const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
    const formik = useFormik({
        initialValues: {
            name: '',
            resource: '',
            date: new Date(),
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const [selectedDate, setSelectedDate] = useState(new Date());

    return (
        <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", fontFamily: "Arial" }}>
            <h1 style={{ marginBottom: "20px" }}>Book Resource</h1>
            <form onSubmit={formik.handleSubmit}>
                {/* Name Input */}
                <div style={{marginBottom: "10px"}}>
                    <label htmlFor="name">Booked by:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        style={{padding: "8px", width: "100%", borderRadius: "4px", border: "1px solid #ccc"}}
                    />
                </div>

                {/* Resource Dropdown */}
                <div style={{marginBottom: "10px"}}>
                    <label htmlFor="resource">Resource you wish to book:</label>
                    <select
                        id="resource"
                        name="resource"
                        onChange={formik.handleChange}
                        value={formik.values.resource}
                        style={{padding: "8px", width: "100%", borderRadius: "4px", border: "1px solid #ccc"}}
                    >
                        <option value="">Select a resource</option>
                        <option value="Meeting Room">Meeting Room</option>
                        <option value="Conference Hall">Conference Hall</option>
                        <option value="Projector">Projector</option>
                    </select>
                </div>

                {/* Datetime Picker */}
                <div style={{marginBottom: "10px"}}>
                    <label>Select booking date and time:</label>
                    <Datetime
                        value={selectedDate}
                        onChange={(date) => {
                            setSelectedDate(date);
                            formik.setFieldValue('date', date);
                        }}
                        dateFormat="DD/MM/YYYY"
                        timeFormat="hh:mm A"
                        className="form-control"
                        style={{width: "100%"}}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        padding: "10px 15px",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        width: "100%"
                    }}
                >
                    Submit
                </button>

                <div>
                    <table className="table table-bordered" style={{marginTop: "10px"}}>
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">First</th>
                            <th scope="col">Last</th>
                            <th scope="col">Handle</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td colSpan="2">Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                    {/* Per Page Dropdown */}
                    <label style={{ marginRight: "10px" }}>Items per page:</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(e.target.value)}
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>

                    {/* Pagination */}
                    <nav aria-label="Page navigation example" style={{ marginLeft: "20px" }}>
                        <ul className="pagination">
                            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
                            <li className="page-item"><a className="page-link" href="#">1</a></li>
                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
                        </ul>
                    </nav>
                </div>
            </form>
        </div>
    );
}

export default BookResource;
