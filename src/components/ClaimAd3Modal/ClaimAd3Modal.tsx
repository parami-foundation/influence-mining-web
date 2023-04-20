import { Modal, notification } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';
import { useWithdrawAD3 } from '../../hooks/useWithdrawAD3';
import { generateWithdrawSignature, getAd3Balance, WithdrawAd3Signature } from '../../services/mining.service';
import { amountToFloatString, inputFloatStringToAmount } from '../../utils/format.util';
import './ClaimAd3Modal.scss';
import LoadingBar from '../LoadingBar/LoadingBar';
import { useHNFT } from '../../hooks/useHNFT';

export interface ClaimAd3ModalProps {
    onCancel: () => void,
    onSuccess: () => void
}

function ClaimAd3Modal({ onCancel, onSuccess }: ClaimAd3ModalProps) {
    const hnft = useHNFT();
    const [balance, setBalance] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [withdrawSig, setWithdrawSig] = useState<WithdrawAd3Signature>();
    const { withdraw, isError, isLoading, isSuccess } = useWithdrawAD3(withdrawSig?.amount, withdrawSig?.nounce, withdrawSig?.sig);

    useEffect(() => {
        getAd3Balance().then(balance => {
            setBalance(amountToFloatString(balance?.balance ?? '0'))
        })
    }, [])

    const onClaim = async () => {
        setLoading(true);
        try {
            const sig = await generateWithdrawSignature(inputFloatStringToAmount(balance));
            setWithdrawSig(sig);
        } catch (e) {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (isError) {
            setLoading(false);
            setWithdrawSig(undefined);
        }
    }, [isError])

    useEffect(() => {
        if (withdrawSig) {
            withdraw?.();
        }
    }, [withdrawSig])

    useEffect(() => {
        if (isSuccess) {
            setLoading(false);
            onSuccess();
        }
    }, [isSuccess])

    return <>
        <Modal
            className='claim-ad3-modal'
            open
            title=""
            onCancel={() => {
                onCancel()
            }}
            footer={null}
            width={956}
        >
            <div className='header'>Claim My AD3</div>
            <div className='content'>
                {loading && <>
                    <LoadingBar></LoadingBar>
                </>}
                {!loading && <>
                    <div className='value'>{balance ? Number(balance).toFixed(4) : ''}</div>
                    <div className='unit'>$AD3</div>
                </>}
            </div>
            <div className='footer'>
                <div className={`action-btn-primary ${loading ? 'disabled' : 'active'}`} onClick={() => {
                    if (!loading) {
                        onClaim()
                    }
                }}>Claim</div>
            </div>
        </Modal>
    </>;
};

export default ClaimAd3Modal;
