import {Button, ButtonGroup,  Spinner} from "reactstrap";
import Containers from '../../../components/Containers/Container'
import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {findAllTransactionAction} from "../../../actions/transactionAction";
import TransactionRow from "./TransactionRow";
import Header from "../../../components/dashboard/Header";
import Menu from "../../../components/dashboard/Menu";
import TableScrollbar from 'react-table-scrollbar';
import Error from "../../Error";
import {PaginationButton} from "../../../components/Buttons";
import Footer from "../../../components/dashboard/Footer";

function TransactionList({
                             isLoading,
                             transactions,
                             error,
                             findAllTransactionAction,
    size, total, currentPage
                         }) {

    const [transaction, setTransaction] = useState([])

    const [pageParam, setPageParam] = useState(0)
    const [sizeParam, setSizeParam] = useState(10)

    const totalPage = Math.ceil(total/size)

    useEffect(() => {
        onReload()
    }, [pageParam, sizeParam])

    useEffect(() => {
        onReload()
    }, [])

    useEffect(() => {
        if(transaction) {
            setTransaction(transactions)
        }
    }, [transactions])

    const onReload = () => {
        findAllTransactionAction(
            {page: pageParam, size: sizeParam}
        );
    };

    useEffect(onReload, [findAllTransactionAction, pageParam, sizeParam])

    const handleLimit = (limit) => {
        setSizeParam(limit)
        setPageParam(0)
    }

    return (
        <div>
            {
               localStorage.getItem("readAllTransaction") == "true" ?
                    <>
                        <Containers error={error}>
                            <Header/>
                            <Menu/>
                            <div className="content-wrapper">
                                <div className="content-header">
                                    <div className="container-fluid">
                                        <div className="row mb-2" style={{marginTop: '30px', display:"flex", justifyContent:"center", alignItems:"center"}}>
                                            <div className="col-sm-11">
                                                <h1 className="m-0 text-dark">All Transaction</h1>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="content">
                                    <div className="container-fluid">
                                        <div className="row" style={{ display:"flex", justifyContent:"center", alignItems:"center"}}>
                                            <div className="col-lg-11">

                                                <div className="card">
                                                    <div className="card-header border-0">
                                                        {/*<h3 className="card-title">List Customer</h3>*/}
                                                        <div className="card-tools">

                                                        </div>
                                                    </div>

                                                    <div className="card-body table-responsive p-0">

                                                        <TableScrollbar rows={10}>
                                                        <table className="table table-striped table-valign-middle">
                                                            <thead style={{textAlign: "left", background:"#FCE051"}}>
                                                            <tr>
                                                                <th>No</th>
                                                                <th>Name</th>
                                                                <th>Employee Type</th>
                                                                <th>Loan</th>
                                                                <th>Tenor</th>
                                                                <th>Interest Rate</th>
                                                                <th>Pending Approval</th>
                                                            </tr>
                                                            </thead>
                                                            <tbody style={{textAlign: "left"}}>
                                                            {
                                                                !isLoading ?
                                                                    // transactions?.list?.map((e, i) => {
                                                                    transaction.map((e, i) => {
                                                                        return (
                                                                            <TransactionRow key={i} data={e}
                                                                                            number={(pageParam * sizeParam) + 1 + i}/>
                                                                        )
                                                                    }) :
                                                                    <div className="spinner">
                                                                        <Spinner style={{ width: '5rem', height: '5rem', color:"#e42256" }} />{' '}
                                                                    </div>
                                                            }
                                                            </tbody>
                                                        </table>
                                                        </TableScrollbar>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <br/>
                                        <PaginationButton
                                            currentPage = {currentPage}
                                            setPage={setPageParam}
                                            totalPage={totalPage}
                                            handleLimit={handleLimit}
                                            size={sizeParam}
                                        />
                                        <br/>
                                    </div>
                                </div>
                            </div>
                            <Footer/>
                        </Containers>
                    </>
                    :
                    <div>
                       <Error/>
                    </div>
            }
        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        error: state.findAllTransactionReducer.error,
        transactions: state.findAllTransactionReducer.data || [],
        isLoading: state.findAllTransactionReducer.isLoading,
        size: state.findAllTransactionReducer.pagination.size,
        total: state.findAllTransactionReducer.pagination.total,
        currentPage: state.findAllTransactionReducer.pagination.page
    }
}

const mapDispatchToProps = {
    findAllTransactionAction
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionList);