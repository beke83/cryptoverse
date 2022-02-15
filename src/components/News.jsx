import React, { useState } from 'react';
import { Select, Typography, Row, Col, Column, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

export const News = ({ simplified }) => {

    const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 12 });

    const { data } = useGetCryptosQuery(100);


    if (!cryptoNews?.value) return 'Loading ....'
    console.log(cryptoNews);
    return (
        <Row gutter={[24, 24]}>
            {/**if not simplified, render the following code */}
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="select a Crypto"
                        optionFilterProp='children'
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowercase().indexOf(input.toLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins?.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
                    </Select>
                </Col>
            )}
            {/* maping through the crypto news to get the data */}
            {cryptoNews.value.map((news, i) => (
                <Col xs={24} sm={12} lg={8} key={i}>
                    <Card hoverable className='news-card'>
                        <a href={news.url} target='_blank' rel='noreferrer'>
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.name}</Title>
                                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news' />
                            </div>
                            <p>
                                {/* if news description is greater than 100 render the string then the remaining string should be represented by ... else render the 100 string*/}
                                {news.description > 100 ? `${news.description.substring(0, 100)} ...` : news.description}
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt="" />
                                    <Text className='provider-name'>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News;