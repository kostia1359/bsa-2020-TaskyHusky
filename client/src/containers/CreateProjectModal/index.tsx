import React, { useState, memo, useEffect } from 'react';
import { Modal, Button, Form, Image, Card, Popup, Header, List } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from 'typings/rootState';

import * as actions from './logic/actions';
import getTemplatesInformation, { MethodologyInfo } from './config/templatesInformation';
import styles from './styles.module.scss';
import CustomInput from 'components/common/Input/CustomInput';
import { generateKey } from 'commonLogic/keyGenerator';
import * as validationMessage from 'constants/ValidationMessages';
import { validProjectName, validProjectKey, validGitHubUrl } from 'helpers/validationRules';
import icons from 'assets/images/project';

type Template = keyof typeof WebApi.Board.BoardType;

interface Props {
	children?: JSX.Element;
}

const CreateProjectModal: React.FC<Props> = ({ children }) => {
	const templatesInformation = getTemplatesInformation();
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const { isLoading, isProjectCreated, keys, isError } = useSelector(
		(rootState: RootState) => rootState.createProject,
	);

	const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
	const [isKeyTouched, setIsKeyTouched] = useState(false);
	const [isTemplatesView, setIsTemplatesView] = useState(false);

	const [name, setName] = useState<string>('');
	const [key, setKey] = useState<string>('');
	const [githubUrl, setGithubUrl] = useState<string>('');
	const [template, setTemplate] = useState<Template>('Scrum');

	const [isNameValid, setIsNameValid] = useState<boolean>(false);
	const [isKeyValid, setIsKeyValid] = useState<boolean>(true);
	const [isGithubUrlValid, setIsGithubUrlValid] = useState<boolean>(true);
	const [isValidErrorShown, setIsValidErrorShown] = useState<boolean>(false);

	const { description, image } = templatesInformation[template];

	useEffect(() => {
		if (isProjectCreated) {
			dispatch(actions.resetState());
			setName('');
			setKey('');
			setTemplate('Scrum');
			setIsNameValid(false);
			setIsKeyValid(true);
			setIsValidErrorShown(false);
			setIsModalOpened(false);
		}
	}, [dispatch, isProjectCreated]);

	const startCreatingProject = () => {
		dispatch(
			actions.startCreatingProject({
				name,
				key,
				template,
				icon: icons.icon1,
				githubUrl,
			}),
		);
	};

	const onCreateProject = (): void => {
		if (!isKeyTouched && !isNameValid) {
			setIsValidErrorShown(true);
			return;
		}

		if (!isNameValid || !isKeyValid) {
			setIsValidErrorShown(true);
			return;
		}

		startCreatingProject();
	};

	const onModalClose = () => {
		setIsTemplatesView(false);

		if (isError) {
			dispatch(actions.resetState());
			return;
		}

		setIsModalOpened(false);
	};

	const onModalOpen = () => {
		setIsModalOpened(true);
		dispatch(actions.startGettingKeys());
	};

	const onNameChanged = (name: string): void => {
		const generatedKey = generateKey({ name, key, isKeyTouched, keys });
		const regexp = new RegExp('\\s{1,}', 'g');
		const removeSpaces = name.replace(regexp, ' ').trimStart();
		setName(removeSpaces);
		setKey(generatedKey);
	};

	const onKeyChanged = (key: string): void => {
		const newKey = key.trim().toUpperCase();
		const keyIndex = keys.findIndex((item: any) => item.key === newKey);

		if (keyIndex !== -1) {
			setIsValidErrorShown(true);
			setIsKeyValid(false);
		}

		if (!isKeyTouched) {
			setIsKeyTouched(true);
		}
		setKey(newKey);
	};

	const selectTemplate = (template: Template) => {
		setIsTemplatesView(false);
		setTemplate(template);
	};

	return (
		<Modal
			onClose={onModalClose}
			onOpen={onModalOpen}
			open={isModalOpened}
			size="tiny"
			dimmer="inverted"
			trigger={children}
			openOnTriggerClick
		>
			{!isTemplatesView ? (
				<>
					<Modal.Header>{t('create_project')}</Modal.Header>

					<Modal.Content>
						<Form className={styles.form_container}>
							<Form.Field>
								<label className="required">{t('name')}</label>
								<CustomInput
									isValidErrorShown={isValidErrorShown}
									isDataValid={isNameValid}
									setIsDataValid={setIsNameValid}
									data={name}
									setData={onNameChanged}
									placeholder={t('enter_project_name')}
									popUpContent={validationMessage.VM_PROJECT_NAME}
									validation={validProjectName}
								/>
							</Form.Field>
							<Form.Field>
								<label className="required">{t('key')}</label>
								<CustomInput
									isValidErrorShown={isValidErrorShown}
									isDataValid={isKeyValid}
									setIsDataValid={setIsKeyValid}
									data={key}
									setData={onKeyChanged}
									placeholder={t('enter_your_key')}
									popUpContent={validationMessage.VM_PROJECT_KEY}
									validation={validProjectKey}
								/>
							</Form.Field>
							<Form.Field>
								<label>GitHub URL</label>
								<CustomInput
									isValidErrorShown={isValidErrorShown}
									isDataValid={isGithubUrlValid}
									setIsDataValid={setIsGithubUrlValid}
									data={githubUrl}
									setData={setGithubUrl}
									placeholder={t('enter_your_project_URL')}
									popUpContent={validationMessage.VM_GITHUB_URL}
									validation={validGitHubUrl}
								/>
							</Form.Field>
						</Form>

						<p className={styles.template__title}>{t('template')}</p>
						<div className={styles.flex_container}>
							<Image src={image} className={styles.modal__image} />
							<div>
								<h2>{template}</h2>
								<p>{description}</p>
								<Button color="grey" onClick={() => setIsTemplatesView(true)} disabled={isLoading}>
									{t('change_template')}
								</Button>
							</div>
						</div>
					</Modal.Content>
					<Modal.Actions>
						<Button color="grey" onClick={onModalClose}>
							{t('cancel')}
						</Button>
						<Button
							content={t('create')}
							labelPosition="right"
							icon="checkmark"
							onClick={onCreateProject}
							primary
							loading={isLoading}
							disabled={isLoading}
						/>
					</Modal.Actions>
				</>
			) : (
				<>
					<Modal.Header>
						<h2 className={styles.modal__title}>{t('choose_classic_template')}</h2>
						<p className={styles.modal__description}>{description}</p>
					</Modal.Header>
					<Modal.Content className={styles.cards_container}>
						{Object.entries(templatesInformation).map(
							([name, { image, description, whyHeader, whyItems, readMoreLink }]: [
								string,
								MethodologyInfo,
							]) => (
								<Card
									key={name}
									className={styles.card__container}
									image={<Image src={image} className={styles.card__image} alt={name + ' image'} />}
									header={name}
									description={description}
									extra={
										<div className={styles.card__actions_container}>
											<Popup
												trigger={<p className={styles.card__link}>{t('whats_this')}</p>}
												flowing
												hoverable
												content={
													<div className={styles.whyPopup}>
														<Header as="h5" className={styles.whyHeader}>
															{whyHeader}:
														</Header>
														<List bulleted>
															{whyItems.map((item) => (
																<List.Item key="item">
																	<List.Content>{item}</List.Content>
																</List.Item>
															))}
														</List>
														<a
															href={readMoreLink}
															target="_blank"
															rel="noopener noreferrer"
															className={styles.readMore}
														>
															{`${t('more_about')} ${name}`}
														</a>
													</div>
												}
											/>
											<Button
												className={styles.card__select_template}
												onClick={() => selectTemplate(name as Template)}
											>
												{t('select')}
											</Button>
										</div>
									}
								/>
							),
						)}
					</Modal.Content>
				</>
			)}
		</Modal>
	);
};

export default memo(CreateProjectModal);
