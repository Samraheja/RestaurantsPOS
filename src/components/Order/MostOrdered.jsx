import React, { useState } from "react";
import chunk from "lodash/chunk";
import get from "lodash/get";
import {
    Row,
    Col,
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselCaption,
    CarouselIndicators
} from "reactstrap";
import localizedStrings from '../../constants/localizations'
import './index.css';

const {
    tableNumberLabel, subcategoriesLabel
} = localizedStrings;
const MostOrdered = (props) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [subCategoryIndex, setSubCategoryIndex] = useState(0)
    const mostOrderedItemChunks = chunk(get(props, 'mostOrdered', []), 9)
    const subCategoriesChunks = chunk(get(props, 'subCategories', []), 16)

    const updateActiveIndex = (prop) => {
        setActiveIndex((prop === 'inc' && mostOrderedItemChunks.length > (activeIndex + 1)) ? (activeIndex + 1) : ((prop === 'dec' && (activeIndex > 0)) ? (activeIndex - 1) : activeIndex))
    };
    const updateActiveSubCategoryIndex = (prop) => {
        setSubCategoryIndex((prop === 'inc' && subCategoriesChunks.length > (subCategoryIndex + 1)) ? (subCategoryIndex + 1) : ((prop === 'dec' && (subCategoryIndex > 0)) ? (subCategoryIndex - 1) : subCategoryIndex))
    };
    return (
        <>
            <Row>
                <Col lg="12" className="token bold">
                    {tableNumberLabel}{props.tableNumber}
                    <hr className="m-0"/>
                </Col>
            </Row>

            <Carousel
                activeIndex={activeIndex}
            >
                {mostOrderedItemChunks.map((items = []) => {
                    return (
                        <CarouselItem
                            // key={item.src}
                        >
                            <Row>
                                {
                                    items.map((item, index) => {
                                        return (
                                            <Col lg="4" key={index} className="cursor-pointer p-1">
                                                <div
                                                    className="MostOrdered"
                                                    onClick={() => {
                                                        props.onMenuItemAdd(item.id, item.tablePrice, 1);
                                                    }}
                                                >
                                                    {item.name}
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </CarouselItem>
                    );
                })}
                {activeIndex > 0 && <CarouselControl className={'carousel-left'} direction="prev"
                                                     onClickHandler={() => {
                                                         updateActiveIndex('dec')
                                                     }}/>}
                {activeIndex < (mostOrderedItemChunks.length - 1) &&
                <CarouselControl className={'carousel-right'} direction="next"
                                 onClickHandler={() => {
                                     updateActiveIndex('inc')
                                 }}/>}
            </Carousel>

            <div className="pt-5"/>
            <Row>
                <Col lg="12" className="token bold">
                    {subcategoriesLabel}
                    <hr className="m-0"/>
                </Col>
            </Row>
            <Carousel
                activeIndex={subCategoryIndex}
                // next={next}
                // previous={previous}
            >
                {subCategoriesChunks.map((items = []) => {
                    return (
                        <CarouselItem
                            // key={item.src}
                        >
                            <Row>
                                {
                                    items.map((item, index) => {
                                        return (
                                            <Col lg="3" key={index} className="cursor-pointer p-1">
                                                <div
                                                    className="MostOrderedCategory"
                                                    onClick={() => {
                                                        props.getMostOrderedItems(item.id);
                                                    }}
                                                >
                                                    {item.subCategoryName}
                                                </div>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </CarouselItem>
                    );
                })}
                {subCategoryIndex > 0 && <CarouselControl className={'carousel-left'} direction="prev"
                                                          onClickHandler={() => {
                                                              updateActiveSubCategoryIndex('dec')
                                                          }}/>}
                {subCategoryIndex < (subCategoriesChunks.length - 1) &&
                <CarouselControl className={'carousel-right'} direction="next"
                                 onClickHandler={() => {
                                     updateActiveSubCategoryIndex('inc')
                                 }}/>}

            </Carousel>
        </>
    )
};

export default MostOrdered;