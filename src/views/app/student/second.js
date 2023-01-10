import React, { useState, useEffect, useContext } from 'react';
import { Row } from 'reactstrap';
import { ThemeColors } from 'helpers/ThemeColors';

const colors = ThemeColors();
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import { context } from 'App';
import UserCardExamples from './UserCardExamples';
import ConversionRatesChartCard from './ConversionRatesChartCard';
const greet = () => {
  const t = new Date().getHours();
  if (t < 12) return "Good Morning";
  if (t > 12 && t < 16) return "Good Afternoon";
  return "Good Evening"
}

const Second = ({ match }) => {
  const [labels, setLabels] = useState("");
  const [num, setNum] = useState(0);
  const [numerics, setNumerics] = useState(0);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: null,
        borderColor: colors.themeColor2,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor2,
        pointHoverBackgroundColor: colors.themeColor2,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 4,
        pointBorderWidth: 2,
        pointHoverRadius: 5,
        fill: true,
        borderWidth: 2,
        backgroundColor: colors.themeColor2_10,
      },
    ],
  })
  const [greeting, setGreeting] = useState("hi")
  const [data, setData] = useContext(context)
  const cgpaCalc=(arr,index)=>{
      var tnu=0;
      var tcp=0;
      for(let i=0;i<index;i++){
        tnu=tnu+arr[i]
        tcp=tcp+arr[i+1]
      }
      return tcp/tnu;
  }
  const chartSummary=()=>{
    var label=[]
    var nums=[]
    var cgpa=[]
    const sessions =Object.keys(data.result);
    for(const s of sessions){
      const semester=Object.keys(data.result[`${s}`])
        for(const sem of semester){
          if(Array.isArray(data.result[`${s}`][`${sem}`])&&(data.result[`${s}`][`${sem}`]).length>0){
            label=[...label,sem]
          }
          if(sem.includes(label[label.length-1])&&sem!==label[label.length-1]){
            nums=[...nums,(data.result[`${s}`][`${sem}`])]
          } 
      }
      nums.splice(-1)
    }
    for(let i=1;i<=label.length;i++){
      cgpa=[...cgpa,cgpaCalc(nums,i)]
    }
    return [label,cgpa]
  }
  useEffect(() => {
    var a =chartSummary()
    setGreeting(() => greet())
    setChartData({ ...chartData, labels: a[0], datasets: [{...chartData.datasets[0],data:a[1]}] })
  },[])
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Breadcrumb heading="menu.second1" match={match} />
          <Separator className="mb-5" />
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12" className="mb-4">
          <p>
            <h2>{greeting}, {data.odata.firstname}</h2>
            <UserCardExamples data={data} />
            {chartData.datasets.data!==null&&<ConversionRatesChartCard data={chartData} />}
          </p>
        </Colxx>
      </Row>
    </>)
};
export default Second;
