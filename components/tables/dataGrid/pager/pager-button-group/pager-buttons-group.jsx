import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PagerButton from '../pager-button';

import './pager-buttons-group.scss';

export default class PagerButtonsGroup extends Component {

    state = {
        activePage: 1,
        blockSize: 3,
    }

    static propTypes = {
        currentPage: PropTypes.number,
        totalPages: PropTypes.number,
        disabled: PropTypes.bool,
        onSetCurrentPage: PropTypes.func,
    }


    componentWillReceiveProps(nextProps) {
        if (this.state.activePage != nextProps.currentPage) {
            this.setState({ activePage: nextProps.currentPage })
        }
    }

    isActiveButton(pageNumber) {
        return this.state.activePage === Number(pageNumber);
    }

    isPrevBlockHidden() {
        const blocks = this.getBlocks();
        return (blocks.totalBlocks == 1 || blocks.currentBlockNumber == 1)
    }

    isNextBlockHidden() {
        const blocks = this.getBlocks();
        return (blocks.totalBlocks == 1 || blocks.currentBlockNumber == blocks.totalBlocks);
    }

    getBlocks() {
        const { blockSize, activePage } = this.state;
        const { totalPages } = this.props;
        const totalBlocks = Math.ceil(totalPages / blockSize);
        const currentBlockNumber = Math.ceil(activePage / blockSize);
        const indexCurrentBlock = currentBlockNumber - 1;

        return {
            indexCurrentBlock, totalBlocks, currentBlockNumber, activePage
        }
    }

    visibleRange() {
        const { blockSize } = this.state;
        const { totalPages } = this.props;
        const blocks = this.getBlocks();
        const start = blocks.indexCurrentBlock * blockSize;
        const delta = totalPages - start;
        const end = start + (delta > blockSize ? blockSize : delta);
        return [start + 1, end + 1];
    }

    createRange(start, end) {
        const range = [];
        for (let i = start; i < end; i++) {
            range.push(i)
        }
        return range;
    }

    renderBlock(pair) {
        const { disabled } = this.props;
        return this.createRange(pair[0], pair[1])
            .map((num) => {
                return (
                    <PagerButton
                        key={num}
                        type={'page-number'}
                        value={num}
                        disabled={disabled}
                        onClickButton={this.handlerSetPage}
                        isActive={this.isActiveButton(num)}
                    />
                )
            })
    }

    handlerSetPage = (e) => {
        e.preventDefault();
        const pageNumber = Number(e.currentTarget.value);
        this.handlerPageChanged(pageNumber);
    }

    handlerPageChanged = pageNum => {
        const { onSetCurrentPage } = this.props;
        this.setState({ activePage: pageNum });
        onSetCurrentPage(pageNum);
    }

    handlerPreviousBlock = () => {
        const { blockSize } = this.state;
        const blocks = this.getBlocks();
        this.handlerPageChanged(blocks.indexCurrentBlock * blockSize);
    }

    handlerNextBlock = () => {
        const {blockSize} = this.state;
        const blocks = this.getBlocks();
        this.handlerPageChanged(blocks.currentBlockNumber * blockSize  + 1);
    }


    render() {
        return (
            <div className="pager-buttons-group">
                {
                    !this.isPrevBlockHidden() && (
                        <PagerButton
                            type={'previous-block'}
                            onClickButton={this.handlerPreviousBlock}
                            value={'...'}
                        />
                    )
                }
                {this.renderBlock(this.visibleRange())}
                {
                    !this.isNextBlockHidden() && (
                        <PagerButton
                            type={'next-block'}
                            onClickButton={this.handlerNextBlock}
                            value={'...'}
                        />
                    )
                }
            </div>
        )
    }
}