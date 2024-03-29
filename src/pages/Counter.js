import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement, increment1, decrement1, increment2, increment3, decrement3 } from "../features/counter/counterSlice";
import axios from "axios";  
import moment from "moment";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export default function Counter(){
    const count = useSelector((state)=> state.counter.count)
    const count1 = useSelector((state)=>state.counter.count1)
    const users = useSelector((state)=>state.counter.users)
     const [users1, setUsers1] = useState([]);
     const [category, setCategory] = useState("");
     const [full_name, setFullName] = useState("");
     const [department, setDepartment] = useState("");
     const [position, setPosition] = useState("");
     const [gender, setGender] = useState("");
     const [date, setDate] = useState(new Date());

     useEffect(() => {
       axios.get("http://localhost:8000/users").then((res) => {
         console.log(res);
         setUsers1(res.data);
       });
     }, []);
     const filteredUsers = category
       ? users1.filter((item) => item.department === category)
       : users1;
     const addUser = (e) => {
       e.preventDefault();
       let birth_date = moment(date).format("DD-MM-YYYY");
       let payload = {
         full_name,
         department,
         position,
         gender,
         birth_date,
        };
        axios.post("http://localhost:8000/users", { ...payload }).then((res) => {
          console.log(res);
        });
      }; 

    const dispatch = useDispatch()
    return (
      <div>
        <h1>{count} metr</h1>
        <button
          onClick={() => dispatch(increment(count1))}
          className="btn btn-success m-2"
        >
          yurish
        </button>
        <button
          onClick={() => dispatch(decrement(count1))}
          className="btn btn-danger m-2"
        >
          qaytish
        </button>

        <div>
          <h1>Qadam kattaligi: {count1}</h1>
          <button
            onClick={() => dispatch(increment1())}
            className="btn btn-primary m-2"
          >
            qadamni kengaytirish
          </button>
          <button
            onClick={() => dispatch(decrement1())}
            className="btn btn-primary m-2"
          >
            qadamni kamaytirish
          </button>
        </div>

        <div className="mt-5">
          <button
            onClick={() => dispatch(increment2(0))}
            className="btn btn-info"
          >
            Add counter
          </button>
          {users.map((item, index) => {
            return (
              <div key={index}>
                <button
                  className="btn btn-info m-2"
                  onClick={() => dispatch(increment3(index))}
                >
                  +
                </button>
                <span>{item}</span>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => dispatch(decrement3(index))}
                >
                  -
                </button>
              </div>
            );
          })}
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <select
                className="form-control my-3"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" hidden>
                  Select department...
                </option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Accounting">Accounting</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>T/R</th>
                    <th>Full name</th>
                    <th>Department</th>
                    <th>Position</th>
                    <th>Gender</th>
                    <th>Birth date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.full_name}</td>
                        <td>{item.department}</td>
                        <td>{item.position}</td>
                        <td>{item.gender}</td>
                        <td>{item.birth_date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <div className="col-md-4">
                <form onSubmit={addUser}>
                  <input
                    type="text"
                    placeholder="Full name"
                    onChange={(e) => setFullName(e.target.value)}
                    className="form-control my-2"
                  />
                  <select
                    className="form-control my-2"
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <option value="" hidden>
                      Select department...
                    </option>
                    <option value="IT">IT</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Accounting">Accounting</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Position"
                    className="form-control my-2"
                    onChange={(e) => setPosition(e.target.value)}
                  />
                  <label htmlFor="male">Male</label>
                  <input
                    type="radio"
                    id="male"
                    value="male"
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                  />
                  <label htmlFor="female">Female</label>
                  <input
                    type="radio"
                    id="female"
                    value="female"
                    onChange={(e) => setGender(e.target.value)}
                    name="gender"
                  />
                  <div>
                    <DatePicker
                      selected={date}
                      dateFormat="dd-MM-yyyy"
                      onChange={(date) => setDate(date)}
                    />
                  </div>
                  <button className="btn btn-success" type="submit">
                    save
                  </button>
                </form>
                  
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}