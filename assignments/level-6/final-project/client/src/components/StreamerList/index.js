import React, { useEffect, useState, useMemo, useContext } from 'react'
import classnames from 'classnames'
import './style.scss'
import { Link, useNavigate } from 'react-router-dom';
import { StreamerContext } from '../../Contexts/StreamerContext';
import { formatNumber } from '../../js';


export default function StreamerList(props) {
  // Get sorting options from params
  const { browseOptions, setBrowseOptions } = useContext(StreamerContext)
  
  // Get list of streamers
  const { PageSize } = props

  const [currentPage, setCurrentPage] = useState(1);
  const [list, setList] = useState([])
  const [sort, setSort] = useState(0)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    
    return list.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, list]);

  const getTableHtml = () => {
    //console.log('currentTableData', currentTableData)
    return currentTableData.map((item, index) => {
      return (
        <Streamer
          item={item}
          index={index}
        />
      )
    })
  }

  useEffect(() => {
    async function getListData(){
      await fetch('/streamers/all')
        .then(res => res.json())
        .then(data => {
          //console.log('getting list', data)
          
          let sortedData = data;

          // Apply sorting options
          if (browseOptions.sort === 'tag') {
            if (browseOptions.order === 'asc') {
              sortedData.sort((a, b) => (a.streamer_tag > b.streamer_tag) ? 1 : -1)
            } else if (browseOptions.order === 'desc') {
              sortedData.sort((a, b) => (a.streamer_tag < b.streamer_tag) ? 1 : -1)
            }
          }

          if (browseOptions.sort === 'name') {
            if (browseOptions.order === 'asc') {
              sortedData.sort((a, b) => (a.streamer_name > b.streamer_name) ? 1 : -1)
            } else if (browseOptions.order === 'desc') {
              sortedData.sort((a, b) => (a.streamer_name < b.streamer_name) ? 1 : -1)
            }
          }

          if (browseOptions.sort === 'real_name') {
            if (browseOptions.order === 'asc') {
              sortedData.sort((a, b) => (a.real_name > b.real_name) ? 1 : -1)
            } else if (browseOptions.order === 'desc') {
              sortedData.sort((a, b) => (a.real_name < b.real_name) ? 1 : -1)
            }
          }

          if (browseOptions.sort === 'subscribers') {
            if (browseOptions.order === 'asc') {
              sortedData.sort((a, b) => (a.subscriber_count > b.subscriber_count) ? 1 : -1)
            } else if (browseOptions.order === 'desc') {
              sortedData.sort((a, b) => (a.subscriber_count < b.subscriber_count) ? 1 : -1)
            }
          }

          /*if (browseOptions.sort === 'likes') {
            if (browseOptions.order === 'asc') {
              sortedData.sort((a, b) => (a.likes > b.likes) ? 1 : -1)
            } else if (browseOptions.order === 'desc') {
              sortedData.sort((a, b) => (a.likes < b.likes) ? 1 : -1)
            }
          }*/

          setList(sortedData)
        })
        .catch(err => console.log(err))
    }
    getListData()
  }, [sort, browseOptions])


  if (list.length <= 0) {
    return (<div>Loading...</div>)
  }

  return (
    <div className={'streamer-list__wrapper'}>
      <div className='browse-options__wrapper'>
        <div className='browse-options__sort browse-options__option'>
          <label>Sort by:</label>
          <select
            value={browseOptions.sort}
            onChange={(e) => {
              setBrowseOptions({
                ...browseOptions,
                sort: e.target.value
              })
            }}
          >
            <option value='tag'>Tag</option>
            <option value='name'>Name</option>
            <option value='real_name'>Real Name</option>
            <option value='subscribers'>Subscribers</option>
          </select>
        </div>

        <div className='browse-options__order browse-options__option'>
          <label>Order:</label>
          <select
            value={browseOptions.order}
            onChange={(e) => {
              setBrowseOptions({
                ...browseOptions,
                order: e.target.value
              })
            }}
          >
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
        
        <button 
          onClick={() => {props.setSort(props.sort + 1)}}
          style={{display: 'none'}}
          >Sort</button>
      </div>

      <Pagination
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={list.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />

      <table className='streamer-list__table'>
        <tbody>
          <tr className={'streamer-list-item__wrapper streamer-list__table-head'}>
            <th>Tag</th>
            <th>Nickname</th>
            <th>Real Name</th>
            <th>Subscribers</th>
            <th>Likes</th>
          </tr>
          {getTableHtml()}
        </tbody>
      </table>
    </div>
  )
}

const Streamer = (props) => {
  const { item, index,  } = props
  const { getFavoriteCount } = useContext(StreamerContext)

  const navigate = useNavigate()
  const [likes, setLikes] = useState(0)

  useEffect(() => {
    getFavoriteCount(item.streamer_tag).then((res) => {setLikes(res)}
    )
  }, [])


  return ( 
    <tr className={'streamer-list-item__wrapper streamer-list__table-row'} key={index}>
      <td className='streamer-list-item__tag'
        onClick={() => {
          navigate(`/profile/${item.streamer_tag}`)
          window.location.reload()
        }}>
          {'@' + item.streamer_tag}
      </td>
      <td>{item.streamer_name}</td>
      <td>{item.real_name}</td>
      <td>{formatNumber(item.subscriber_count)}</td>
      <td>{likes}</td>
    </tr>
  )
}

// Pagination
const DOTS = '.';

const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    const totalPageNumbers = siblingCount + 5;

    // Case 1: No pagination is required
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    // Cas 2: No left dots to show, but right dots to be shown
    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }
    
    // Case 3: No right dots to show, but left dots to be shown
    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }
     
    // Case 4: Both left and right dots to be shown
    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
      
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, index) => {
         
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots" key={index}>&#8230;</li>;
        }
		
        // Render our Page Pills
        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
            key={index}
          >
            {pageNumber}
          </li>
        );
      })}

      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};