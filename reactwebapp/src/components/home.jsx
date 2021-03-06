import React, { useState, useEffect } from 'react'
import Remark from './remark'
import { findRemarkWithText, getRemarksSortedByDate, getRemarksSortedByHeard, getNumberOfRemarks } from '../DAOs/remarksDAO'

import {
    Button,
    IconButton,
    TextField
} from '@material-ui/core';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const Home = () => {
    const [remarks, setRemarks] = useState([])
    const [date, setDate] = useState({ color: 'primary', status: 'down' })
    const [heard, setHeard] = useState({ color: 'default', status: null })
    const [pageParameters, setPageParameters] = useState({ type: 'date', order: -1, skip: 0, number: 10 })
    const [pageNumber, setPageNumber] = useState(1)
    const [numberTotalRemarks, setNumberTotalRemarks] = useState(0)
    const [searchText, setSearchText] = useState('')
    const [searchMatch,setSearchMatch] = useState(true)

    useEffect(() => {
        async function fetchData() {
            const numberTotalRemarks = await getNumberOfRemarks()
            setNumberTotalRemarks(numberTotalRemarks)
            const response = await _getRemarks(pageParameters.type, pageParameters.order, pageParameters.skip, pageParameters.number)
            setRemarks(response)
        }
        fetchData()

    },
        [pageParameters]
    )

    useEffect(() => {
        async function fetchData(search) {
            const remarks = await findRemarkWithText(search)
            if (remarks.length !== 0) {
                setSearchMatch(true)
                setRemarks(remarks)
            } else {
                setSearchMatch(false)
            }
        }
        if (searchText !== '' ) {
            fetchData(searchText)
        }
    },
        [searchText]
    )

    const _getRemarks = async (type, order, skip, number) => {
        if (type === 'date') {
            return getRemarksSortedByDate(order, skip, number)
        } else if (type === 'heard') {
            return getRemarksSortedByHeard(order, skip, number)
        }
    }

    const _filter = async (type) => {
        const oldSkip = pageParameters.skip
        const oldNumber = pageParameters.number
        switch (type) {
            case 'date':
                if (date.status === 'up') {
                    setDate({ color: 'primary', status: 'down' })
                    setPageParameters({
                        type: 'date',
                        order: -1,
                        skip: oldSkip,
                        number: oldNumber
                    })
                } else {
                    setDate({ color: 'primary', status: 'up' })
                    setPageParameters({
                        type: 'date',
                        order: 1,
                        skip: oldSkip,
                        number: oldNumber
                    })
                }
                setHeard({ color: 'default', status: '' }) //no status --> no icon
                break;
            case 'heard':
                if (heard.status === 'up') {
                    setHeard({ color: 'primary', status: 'down' })
                    setPageParameters({
                        type: 'heard',
                        order: 1,
                        skip: oldSkip,
                        number: oldNumber
                    })
                } else { //si c'est down ou non selectionné
                    setHeard({ color: 'primary', status: 'up' })
                    setPageParameters({
                        type: 'heard',
                        order: -1,
                        skip: oldSkip,
                        number: oldNumber
                    })
                }
                setDate({ color: 'default', status: '' }) //no status --> no icon
                break;
            default:
                console.error('Error in filter selection type.')
        }
    }
    const _chooseIcon = (filter) => {
        if (filter.status === 'up') {
            return <KeyboardArrowUpIcon />
        } else if (filter.status === 'down') {
            return <KeyboardArrowDownIcon />
        } else {
            return null
        }
    }

    const _chooseFilterColor = (filter) => {
        if (filter.status === 'up' || filter.status === 'down') {
            return 'primary'
        } else {
            return 'default'
        }
    }

    const _pageSelector = (side) => {
        const oldType = pageParameters.type
        const oldOrder = pageParameters.order
        var skip = pageParameters.skip
        const oldPageNumber = pageNumber
        const number = 10
        if (side === 'right') {
            setPageNumber(oldPageNumber + 1)
            skip = pageParameters.number + pageParameters.skip // on passe les remarks deja vues
        } else if (side === 'left') {
            setPageNumber(oldPageNumber - 1)
            skip = pageParameters.skip - pageParameters.number
        }

        setPageParameters({
            type: oldType,
            order: oldOrder,
            skip: skip,
            number: number
        })
    }

    const _isPageSelectorDisabled = (selector) => {
        if (selector === 'right') {
            if (pageParameters.skip + pageParameters.number >= numberTotalRemarks) {
                return true
            } else {
                return false
            }
        } else if (selector === 'left') {
            if (pageNumber === 1) {
                return true
            } else {
                return false
            }
        } else {
            return true
        }

    }

    const _handleChangeSearchText = (event) => {
        const text = event.target.value
        if (text !== '') {
            setSearchText(text)
        } else {
            setSearchMatch(true)
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.search}>
                <TextField
                    fullWidth
                    size='medium'
                    id='textArea'
                    label='Search a remark'
                    variant='filled'
                    onChange={(e)=> _handleChangeSearchText(e)}
                    error={!searchMatch}
                    helperText={!searchMatch && "No match on this search."}
                />
            </div>
            <div style={styles.filters}>
                <span style={styles.button}>
                    <Button
                        variant="contained"
                        color={_chooseFilterColor(date)}
                        onClick={() => {
                            _filter('date')
                        }}
                        startIcon={_chooseIcon(date)}
                    > Date
                    </Button>

                </span>
                <span style={styles.button}>
                    <Button
                        variant="contained"
                        color={_chooseFilterColor(heard)}
                        onClick={() => {
                            _filter('heard')
                        }}
                        startIcon={_chooseIcon(heard)}
                    > Heard
                    </Button>

                </span>
            </div>
            <div style={styles.pageSelectors}>
                <span>
                    <IconButton disabled={_isPageSelectorDisabled('left')} color="secondary" onClick={() => _pageSelector('left')}>
                        <ArrowLeftIcon fontSize="large" />
                    </IconButton>
                </span>
                <span>Page {pageNumber}/{Math.ceil(numberTotalRemarks / pageParameters.number)}</span>
                <span>
                    <IconButton disabled={_isPageSelectorDisabled('right')} color="secondary" onClick={() => _pageSelector('right')}>
                        <ArrowRightIcon fontSize="large" />
                    </IconButton>
                </span>
            </div>
            {(remarks instanceof Array) && remarks.map((remark, index) => (
                <div key={index} style={styles.remark}>
                    <Remark remark={remark} isClickable={true}></Remark>
                </div>
            ))}
            {(remarks.length > 3) &&
                (<div style={styles.pageSelectors}>
                    <span>
                        <IconButton disabled={_isPageSelectorDisabled('left')} color="secondary" onClick={() => _pageSelector('left')}>
                            <ArrowLeftIcon fontSize="large" />
                        </IconButton>
                    </span>
                    <span>Page {pageNumber}/{Math.ceil(numberTotalRemarks / pageParameters.number)}</span>
                    <span>
                        <IconButton disabled={_isPageSelectorDisabled('right')} color="secondary" onClick={() => _pageSelector('right')}>
                            <ArrowRightIcon fontSize="large" />
                        </IconButton>
                    </span>
                </div>)
            }
        </div>
    )
}

let styles = {
    container: {
        margin: 20,
        marginTop: 40,
    },
    remark: {
        margin: 20,
    },
    search: {
        marginBottom: 30
    },
    filters: {
        marginBottom: 10
    },
    button: {
        margin: 10
    },
    pageSelectors: {
        marginLeft: 10,
        marginRight: 10
    }
}

export default Home