import React from 'react';
import millify from 'millify'; // this is the package to format the numbers
import { Typography, Row, Col, Statistic } from 'antd';
import { Link } from 'react-router-dom';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Cryptocurrencies, News } from '../components'

const { Title } = Typography //destructure the title from Typography

export const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  //make use of the data
  const globalStats = data?.data?.stats

  if (isFetching) return 'Loading...';
  return (
    <>
      <Title level={2} className="heading">Global  Crypto Stats</Title>
      <Row>
        <Col span={12}><Statistic title="Total Crypto Currencies" value={globalStats.total} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} /></Col>
        <Col span={12}><Statistic title="Total Market" value={millify(globalStats.totalMarkets)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world</Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show more</Link></Title>
      </div>
      <Cryptocurrencies simplified />

      <div className="home-heading-container">
        <Title level={2} className="home-title">Latest Crypto News</Title>
        <Title level={3} className="show-more"><Link to="/news">Show more</Link></Title>
      </div>
      <News simplified />
    </>
  )
}

//simplified shows only the first 10 
//in antd there are total of 24 space but in bootstrap there is a total of 12 spaces
export default Homepage;