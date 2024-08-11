import { Button, Grid, Popconfirm, Radio, Space, Tooltip } from 'antd';
import { styled } from 'styled-components';
import SearchComponent from './navbar/Search';
import { isAccessibleWithIncludes } from '../functions';
import {
	CheckSquareOutlined,
	DeleteOutlined,
	DownloadOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
	MergeCellsOutlined,
	MessageOutlined,
	PlusOutlined,
	PrinterOutlined,
	SaveOutlined,
} from '@ant-design/icons';
import TableViews from './TableViews';
import styles from '../styles/header.module.scss';
import SearchModal from './searchModal/SearchModal';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { TButtonObjProps } from '../types/generalType';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setExecutorTransferItems } from '../store/executor/executorSlice';
import Avatars from '../pages/structure/Access/Components/Avatars';
import { TAssignment } from '../types/task';
import { useParams } from 'react-router-dom';
import TableTypeOptions from './TableTypeOptions';

const { useBreakpoint } = Grid;

const StyledButton = styled(Button)`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5px;
`;

function HeaderButtons({
	buttonsObj,
	renderedIn = '',
}: {
	buttonsObj: TButtonObjProps;
	renderedIn?: string;
}) {
	const screens = useBreakpoint();
	const {
		views = false,
		tableTypeOptions = false,
		add,
		save = { ...buttonsObj.save, showIcon: true },
		download,
		merge,
		access,
		search = true,
		deleteButton,
		submitButton,
		commentButton,
		commentAllButton,
		readButton,
		unreadButton,
		acceptButton,
		contactButton,
		print,
		transfer,
		transferResponsibility,
		withoutAccessCreate = false,
		calculate,
	} = buttonsObj;
	const { t } = useTranslation();
	const { buttonLoading, me } = useAppSelector(state => state.general);
	const { taskItemSendInfo } = useAppSelector(state => state.task);
	const { executorTransferItems } = useAppSelector(state => state.executor);
	const dispatch = useAppDispatch();
	const { type } = useParams();
	return (
		<>
			{search ? (
				<>
					<SearchComponent renderedIn={renderedIn} />
					<SearchModal renderedIn={renderedIn} />
				</>
			) : (
				''
			)}

			<div className={styles['buttons']}>
				{tableTypeOptions ? <TableTypeOptions /> : ''}
				{views && screens.lg ? <TableViews /> : ''}

				{transferResponsibility?.display ? (
					<Popconfirm
						placement='topLeft'
						showCancel={false}
						title={t('WhatDoYouWant?')}
						okText={t('Next')}
						description={
							<Radio.Group
								value={executorTransferItems?.type}
								onChange={e => {
									dispatch(
										setExecutorTransferItems({ ...executorTransferItems, type: e.target.value }),
									);
								}}
							>
								<Space direction='vertical'>
									<Radio value='transfer'>{t('Transfer')}</Radio>
									<Radio value='copy'>{t('Copy')}</Radio>
									<Radio value='delete'>{t('Delete')}</Radio>
								</Space>
							</Radio.Group>
						}
						onConfirm={() => transferResponsibility?.function?.()}
					>
						<StyledButton type='primary' className={styles['add-button']}>
							<p>{t(transferResponsibility.name as string)}</p>
						</StyledButton>
					</Popconfirm>
				) : (
					''
				)}
				{download?.display && isAccessibleWithIncludes(access, 'R') ? (
					<StyledButton
						type='primary'
						icon={<DownloadOutlined />}
						className={styles['add-button']}
						onClick={() => download?.function?.()}
						loading={buttonLoading?.download}
					>
						{t('DownloadExcel')}
					</StyledButton>
				) : (
					''
				)}
				{merge?.display && isAccessibleWithIncludes(access, 'U') ? (
					<StyledButton
						type='primary'
						icon={<MergeCellsOutlined />}
						className={styles['add-button']}
						onClick={() => merge?.function?.()}
						loading={buttonLoading?.merge}
					>
						{t('MergeTopics')}
					</StyledButton>
				) : (
					''
				)}
				{deleteButton?.display && isAccessibleWithIncludes(access, 'D') ? (
					<StyledButton
						type='primary'
						icon={<DeleteOutlined />}
						className={styles['add-button']}
						onClick={() => deleteButton?.function?.()}
						danger
						loading={buttonLoading?.delete}
					>
						<p>{t(deleteButton.title!)}</p>
					</StyledButton>
				) : (
					''
				)}
				{commentButton?.display ? (
					<Tooltip title={<Avatars avatars={[taskItemSendInfo?.creator!]} />}>
						<StyledButton
							type='primary'
							icon={<MessageOutlined />}
							className={styles['add-button']}
							onClick={() => commentButton?.function?.()}
						>
							<p>{t(commentButton.title!)}</p>
						</StyledButton>
					</Tooltip>
				) : (
					''
				)}
				{commentAllButton?.display ? (
					<Tooltip
						title={
							<Avatars
								avatars={
									[type === 'myControlTasks' ? me : taskItemSendInfo?.creator!]?.concat(
										taskItemSendInfo?.assignments?.map(
											(assignment: TAssignment) => assignment?.executor,
										),
									)!
								}
							/>
						}
					>
						<StyledButton
							ghost
							type='primary'
							icon={<MessageOutlined />}
							// className={styles['add-button']}
							onClick={() => commentAllButton?.function?.()}
						>
							<p>{t(commentAllButton.title!)}</p>
						</StyledButton>
					</Tooltip>
				) : (
					''
				)}
				{submitButton?.display ? (
					<StyledButton
						type='primary'
						icon={<CheckSquareOutlined />}
						className={styles['add-button']}
						onClick={() => submitButton?.function?.()}
						loading={buttonLoading?.submit}
					>
						<p>{t(submitButton.title!)}</p>
					</StyledButton>
				) : (
					''
				)}
				{print?.display && isAccessibleWithIncludes(access, 'R') ? (
					<StyledButton
						type='primary'
						icon={<PrinterOutlined />}
						onClick={() => print?.function?.()}
						ghost
					>
						<p>{t(print.title!)}</p>
					</StyledButton>
				) : (
					''
				)}
				{add?.display && (isAccessibleWithIncludes(access, 'C') || withoutAccessCreate) ? (
					<StyledButton
						type='primary'
						className={styles['add-button']}
						onClick={() => add?.function?.()}
						icon={<PlusOutlined />}
					>
						<p>{t(add.name as string)}</p>
					</StyledButton>
				) : (
					''
				)}
				{transfer?.display ? (
					<StyledButton
						type='primary'
						className={styles['add-button']}
						onClick={() => transfer?.function?.()}
					>
						<p>{t(transfer.name as string)}</p>
					</StyledButton>
				) : (
					''
				)}
				{readButton?.display ? (
					<StyledButton
						type='primary'
						className={styles['add-button']}
						onClick={() => readButton?.function?.()}
						icon={<EyeOutlined />}
						loading={buttonLoading?.readNotification}
					>
						<p>{t(readButton.title as string)}</p>
					</StyledButton>
				) : (
					''
				)}
				{unreadButton?.display ? (
					<StyledButton
						type='primary'
						onClick={() => unreadButton?.function?.()}
						ghost
						icon={<EyeInvisibleOutlined />}
						loading={buttonLoading?.unreadNotification}
					>
						<p>{t(unreadButton.title as string)}</p>
					</StyledButton>
				) : (
					''
				)}
				{acceptButton?.display ? (
					<StyledButton
						type='primary'
						onClick={() => acceptButton?.function?.()}
						loading={buttonLoading?.accept}
					>
						<p>{t(acceptButton.title as string)}</p>
					</StyledButton>
				) : (
					''
				)}
				{calculate?.display ? (
					<StyledButton
						type='primary'
						onClick={() => calculate?.function?.()}
						loading={calculate?.loading}
					>
						<p>{t(calculate.title as string)}</p>
					</StyledButton>
				) : (
					''
				)}
				{contactButton?.display ? (
					<StyledButton
						type='primary'
						onClick={() => contactButton?.function?.()}
						loading={buttonLoading?.accept}
					>
						<p>{t(contactButton.title as string)}</p>
					</StyledButton>
				) : (
					''
				)}
				{save?.display &&
				(isAccessibleWithIncludes(access, 'U') ||
					isAccessibleWithIncludes(access, 'C') ||
					location?.pathname?.includes('myAssets') ||
					withoutAccessCreate) ? (
					<StyledButton
						type='primary'
						className={styles['add-button']}
						onClick={() => save?.function?.()}
						icon={save.showIcon ? <SaveOutlined /> : null}
						loading={buttonLoading?.save}
					>
						<p>{save.title ? save.title : t('Save')}</p>
					</StyledButton>
				) : (
					''
				)}
			</div>
		</>
	);
}

export default React.memo(HeaderButtons);
