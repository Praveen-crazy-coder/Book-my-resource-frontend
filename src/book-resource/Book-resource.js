import {useFormik} from 'formik';
import {useEffect, useState} from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";
import api from "../api";
import './Book-resource.css';


function BookResource() {
    const [errorMessage, setErrorMessage] = useState('');
    const [resourceList, setResourceList] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
    const handleDeleteButton = (bookingId) => {
        api.delete(`/book-resource/${bookingId}`)
            .then((response) => {
                setBookings(bookings.filter(booking => booking.id !== bookingId))
                console.log("Successfully deleted booking")
            })
            .catch((error) => {
                console.error(error)
            });
    }
    const formik = useFormik({
        initialValues: {
            bookedBy: '',
            resourceName: '',
            date: new Date(),
            fromTime: new Date(),
            toTime: new Date(),
        },
        validate: (values) => {
            const errors = {};
            if (!values.bookedBy) {
                errors.bookedBy = 'Please add your name';
            }
            if (!values.resourceName) {
                errors.resourceName = 'Please select resource name';
            }
            return errors;
        },
        onSubmit: values => {
            const valuesCopy = {...values};
            let date = values.date;
            let formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
            valuesCopy.date = formattedDate;
            valuesCopy.fromTime = new Date(values.fromTime).toLocaleTimeString('en-US', {hour12: true});
            valuesCopy.toTime = new Date(values.toTime).toLocaleTimeString('en-US', {hour12: true});
            api.post('/book-resource', valuesCopy)
                .then(response => {
                    console.debug('Booked the resource')
                    window.location.reload();
                })
                .catch(error => {
                    setErrorMessage(error.response.data.error);
                });
        },
    });

    useEffect(() => {
        Promise.all([
            api.get('/resources'),
            api.get(`/bookings?page=${page}&limit=${itemsPerPage}`) // Add parameters to the API call
        ]).then(([resourceResponse, bookingsResponse]) => {
            setResourceList(resourceResponse.data);
            const bookingsData = Object.values(bookingsResponse.data).filter(item => typeof item === 'object' && item !== null);
            setBookings(bookingsData)
        })
            .catch(error => console.error(error));
    }, [page, itemsPerPage]); // Adding Dependency

    return (
        <div style={{padding: "20px", maxWidth: "500px", margin: "0 auto", fontFamily: "Arial"}}>
            <h1 style={{marginBottom: "20px"}}>Book Resource</h1>
            <form onSubmit={formik.handleSubmit}>
                {/* Name Input */}
                <div style={{marginBottom: "10px"}}>
                    <label htmlFor="bookedBy">Booked by:</label>
                    <input
                        id="bookedBy"
                        name="bookedBy"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        style={{padding: "8px", width: "100%", borderRadius: "4px", border: "1px solid #ccc"}}
                    />
                    {formik.touched.bookedBy && formik.errors.bookedBy ? (
                        <div style={{color: 'red'}}>{formik.errors.bookedBy}</div>
                    ) : null}
                </div>

                {/* Resource Dropdown */}
                <div style={{marginBottom: "10px"}}>
                    <label htmlFor="resourceName">Resource you wish to book:</label>
                    <select
                        id="resourceName"
                        name="resourceName"
                        onChange={formik.handleChange}
                        value={formik.values.resource}
                        style={{padding: "8px", width: "100%", borderRadius: "4px", border: "1px solid #ccc"}}
                    >
                        <option value="">Select a resource</option>
                        {resourceList.map((resource) => (
                            <option value={resource.name}>{resource.name}</option>
                        ))}
                    </select>
                    {formik.touched.bookedBy && formik.errors.bookedBy ? (
                        <div style={{color: 'red'}}>{formik.errors.resourceName}</div>
                    ) : null}
                </div>

                {/* DateTime Picker */}
                {/* Date Picker */}
                <div style={{marginBottom: "10px"}}>
                    <label>Select booking date:</label>
                    <Datetime
                        value={formik.values.date}
                        onChange={(date) => formik.setFieldValue('date', date)}
                        timeFormat={false}
                        dateFormat="DD/MM/YYYY"
                        className="form-control"
                        style={{width: "100%"}}
                    />
                </div>

                <div style={{marginBottom: "10px"}}>
                    <label>Select booking "From" time:</label>
                    <Datetime
                        value={formik.values.fromTime}
                        onChange={(date) => formik.setFieldValue('fromTime', date)}
                        dateFormat={false}
                        timeFormat="hh:mm A"
                    />
                </div>

                <div style={{marginBottom: "10px"}}>
                    <label>Select booking "To" time:</label>
                    <Datetime
                        value={formik.values.toTime}
                        onChange={(date) => formik.setFieldValue('toTime', date)}
                        dateFormat={false}
                        timeFormat="hh:mm A"
                    />
                </div>

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
                {errorMessage && <div style={{color: 'red'}}>{errorMessage}</div>}
            </form>

            <h3 className="table-header">Booked resources:</h3>
            <div>
                <table className="table table-bordered" style={{marginTop: "10px"}}>
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Booked by</th>
                        <th scope="col">Resource name</th>
                        <th scope="col">Date</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.id}>
                            <th scope="row">{booking.id}</th>
                            <td>{booking.bookedBy}</td>
                            <td>{booking.resourceName}</td>
                            <td>{booking.date}</td>
                            <td>{booking.fromTime}</td>
                            <td>{booking.toTime}</td>
                            <td>
                                <button type="button" className="btn btn-danger"
                                        onClick={() => handleDeleteButton(booking.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <div style={{display: "flex", alignItems: "center", marginTop: "10px"}}>
                {/* Per Page Dropdown */}
                <label style={{marginRight: "10px"}}>Items per page:</label>
                <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(e.target.value)}

                    style={{padding: "8px", borderRadius: "4px", border: "1px solid #ccc"}}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </select>

                {/* Pagination */}
                <nav aria-label="Page navigation example" style={{marginLeft: "20px"}}>
                    <ul className="pagination">
                        <li className="page-item">
                            <button type="button" className="page-link"
                                    onClick={() => setPage(page => Math.max(page - 1, 1))}
                                    disabled={page === 1}
                            >Previous
                            </button>
                        </li>
                        <li className="page-item">
                            <button type="button"
                                    className="page-link"
                                    onClick={() => setPage(1)}
                            >1
                            </button>
                        </li>
                        <li className="page-item">
                            <button type="button"
                                    className="page-link"
                                    onClick={() => setPage(2)}
                            >2
                            </button>
                        </li>
                        <li className="page-item">
                            <button type="button"
                                    className="page-link"
                                    onClick={() => setPage(3)}
                            >3
                            </button>
                        </li>
                        <li className="page-item">
                            <button type="button" className="page-link"
                                    onClick={() => setPage(page => page + 1)}
                            >Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default BookResource;
