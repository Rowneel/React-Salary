import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [datas, setDatas] = useState(
    () => JSON.parse(localStorage.getItem("datas")) || []
  );
  const [formData, setFormData] = useState({
    firstname: "",
    salary: "",
  });
  const [action, setAction] = useState("increase");
  const [total, setTotal] = useState(0);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleRadio(event) {
    const { value } = event.target;
    setAction(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const personExists = datas.some(
      (data) => data.firstname === formData.firstname
    );
    function changeSalary(salary, action) {
      if (action === "increase") {
        return salary + parseFloat(formData.salary);
      } else {
        return salary - parseFloat(formData.salary);
      }
    }
    setDatas((prevDatas) =>
      personExists
        ? prevDatas.map((prevData) => {
            return prevData.firstname === formData.firstname
              ? {
                  ...prevData,
                  salary: changeSalary(parseFloat(prevData.salary), action),
                }
              : prevData;
          })
        : [...prevDatas, formData]
    );
  }

  useEffect(() => {
    localStorage.setItem("datas", JSON.stringify(datas));
    let sum = 0;
    for (const data of datas) {
      sum += parseFloat(data.salary);
    }
    setTotal(sum);
  }, [datas]);

  const tableRows = datas.map((data, index) => (
    <tr key={index}>
      <td>{data.firstname}</td>
      <td>{data.salary}</td>
    </tr>
  ));
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Name</label>
        <input
          type="text"
          id="firstname"
          onChange={handleChange}
          name="firstname"
        />
        <br />
        <label htmlFor="salary">Salary</label>
        <input type="text" id="salary" name="salary" onChange={handleChange} />
        <br />
        <input
          type="radio"
          id="increase"
          name="action"
          value="increase"
          onChange={handleRadio}
          checked={action === "increase"}
        />
        <label htmlFor="increase">Increase</label>
        <input
          type="radio"
          id="decrease"
          name="action"
          value="decrease"
          onChange={handleRadio}
          checked={action === "decrease"}
        />
        <label htmlFor="decrease">Decrease</label>
        <button type="submit">Submit</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>

      Total: {total}
    </>
  );
}

export default App;
