
import logo from './logo.svg';
import './App.css';
// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import MainTable from './MainTable';
import LineGraph from './LineGraph';
import AggregatedJobTitles from './AggregatedJobTitles';
// import ChatModel from './GPTInteractor';
import GPTInteractor from './GPTInteractor';
import QuestionInput from './QuestionInput';
import { loadCSVData, SalaryData } from './dataLoader';
const { Header, Content } = Layout;

const App: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [data, setData] = useState<any[]>([]);
  const handleRowClick = (year: number) => {
    setSelectedYear(year);
  };
  useEffect(() => {
    loadCSVData('/salaries.csv').then((data) => {
      setData(data);
    });
  }, []);
  const [question, setQuestion] = useState<string>('');

  const styless: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    maxWidth: '800px',
    padding: '20px',
    textAlign: 'center',
};
  return (
    <>
    
    <Layout>
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">Salaries Dashboard</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', marginTop: '20px' }}>
        <MainTable onRowClick={handleRowClick} />
        <div style={{ marginTop: '20px' }}>
          <LineGraph />
        </div>
        {selectedYear && (
          <div style={{ marginTop: '20px' }}>
            <h2>Job Titles in {selectedYear}</h2>
            <AggregatedJobTitles year={selectedYear} />
          </div>
        )}
      </Content>

    </Layout>
    <div style={styless}>
            <h1 style={styles.heading}>AI Model Demo</h1>
            
            <QuestionInput onQuestionSubmit={setQuestion} />
          <h1 >Answer :</h1>  
            {data.length > 0 && question && <GPTInteractor data={data} question={question} />}
        </div>
    
    </>
  );
};

const styles = {
  container: {
      fontFamily: 'Arial, sans-serif',
      margin: '0 auto',
      maxWidth: '800px',
      padding: '20px',
      textAlign: 'center',
  },
  heading: {
      fontSize: '2em',
      marginBottom: '20px',
  },
};
export default App;

