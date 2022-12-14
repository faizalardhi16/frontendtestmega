import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { InputText } from './components'
import { BPKBInterface } from './interfaces/BPKBInterface';
import { IForm } from './interfaces/IForm';
import styles from "./App.module.scss";
import Devider from './components/Devider';
import InputDate from './components/InputDate';
import Select from './components/Select';
import { LocationInterface } from './interfaces/LocationInterface';

function App() {
  const [count, setCount] = useState(0);
  const [dataBpkb, setDataBpkb] = useState<BPKBInterface[]>([]);
  const [locations, setLocations] = useState<LocationInterface[]>([]);
  const [form, setForm] = useState<IForm>({
    agreementNumber:"",
    bpkbDate: new Date(),
    bpkbDateIn: new Date(),
    bpkbNumber: "",
    branchId: "",
    fakturNumber:"",
    locationId: "",
    policeNo: "",
    fakturDate: new Date()
  });

  const {
    agreementNumber, bpkbDate, bpkbDateIn, bpkbNumber,
    branchId, fakturNumber, locationId, policeNo, fakturDate  
  } = form;


  useEffect(() => {
    const fetchData = async () => {
      const res: Response = await fetch("http://localhost:5000/api/Location");
      const data: LocationInterface[] = await res.json();

      setLocations(data);
    }

    fetchData();
  },[]);

  const handlePost = async (e: any) => {
    console.log("DD")
    e.preventDefault()
   try {
     const post = {
      agreementNumber: agreementNumber,
      bpkbDate: bpkbDate.toISOString(),
      bpkbDateIn: bpkbDateIn.toISOString(),
      bpkbNumber: bpkbNumber,
      branchId: branchId,
      fakturNumber: fakturNumber,
      locationId: locationId,
      policeNo: policeNo,
      fakturDate: fakturDate.toISOString()
    }

    const rawResponse = await fetch("http://localhost:5000/api/BPKBs", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    });
    const content = await rawResponse.json();

    console.log(content);
   } catch (error) {
    console.log(error)
   }
  }


  return (
    <div className={styles.container}>
      <form onSubmit={handlePost}>
        <div className={styles.sectionLeft}>
          <InputText 
            label="Agreement Number"
            placeholder="Input Agreement Number" value={agreementNumber} name="agreementNumber" 
            onChange={(e) => {setForm({...form, agreementNumber: e.target.value})}}
          />
          <Devider />
          <InputText 
            label="Branch Id"
            placeholder="Input Branch Id" value={branchId} name="branchId" 
            onChange={(e) => {setForm({...form, branchId: e.target.value})}}
          />
          <Devider />
          <InputText 
            label="No BPKB"
            placeholder="Input No. BPKB" value={bpkbNumber} name="bpkbNumber" 
            onChange={(e) => {setForm({...form, bpkbNumber: e.target.value})}}
          />
          <Devider/>
          <InputDate label="Tanggal BPKB In"
            placeholder="Input Tanggal BPKB In" name="bpkbDateIn" 
            onChange={(e) => {setForm({...form, bpkbDateIn: new Date(e.target.value)})}}
          />
          <Devider/>
          <InputDate label="Tanggal BPKB"
            placeholder="Input Tanggal BPKB" name="bpkbDate" 
            onChange={(e) => {setForm({...form, bpkbDate: new Date(e.target.value)})}}
          />
          <Devider/>
          <InputText 
            label="No Faktur"
            placeholder="Input Faktur Number" value={fakturNumber} name="fakturNumber" 
            onChange={(e) => {setForm({...form, fakturNumber: e.target.value})}}
          />
        </div>
        <div className={styles.middle}>
          <hr/>
        </div>
        <div className={styles.sectionRight}>
          <InputDate label="Tanggal Faktur"
            placeholder="Input Tanggal Faktur" name="fakturDate" 
            onChange={(e) => {setForm({...form, fakturDate: new Date(e.target.value)})}}
          />
          <Devider/>
          <InputText 
            label="No Polisi"
            placeholder="Input No Polisi" value={policeNo} name="policeNo" 
            onChange={(e) => {setForm({...form, policeNo: e.target.value})}}
          />
          <Devider/>
          <Select value={locationId} onChange={(e) => {setForm({...form, locationId: e.target.value})}}>
            {locations.map((location) => <option key={location.locationId} value={location.locationId}>{location.locationName}</option>)}
          </Select>
        </div>
        <button type="submit">Submit</button>
      </form>

      
    </div>
  )
}

export default App
