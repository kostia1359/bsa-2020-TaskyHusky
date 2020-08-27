import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { RootState } from 'typings/rootState';
import { Button, Checkbox, Select, Form } from 'semantic-ui-react';
import SubmitedInput from 'components/SubmitedInput';
import CustomValidator from 'helpers/validation.helper';
import { sendEmailResetLink } from 'containers/ProfilePage/logiс/actions';

const EmailManager = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const email = useSelector((state: RootState) => state.user.email);
	const [emailData, setEmailData] = useState<string>('');
	const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
	const [errorMessage, setErrorMessage] = useState<string>('');
	const [isSubmit, setIsSumbit] = useState<boolean>(false);

	const handleChange = (event: any) => {
		setEmailData((event.target as HTMLInputElement).value);
	};

	const onBlur = () => {
		const customValidator = new CustomValidator(emailData);
		const isntValid = customValidator.checkMinLength(6).checkMaxLength(321).checkEmailField().validate();
		if (isntValid) {
			setErrorMessage(isntValid);
			setIsEmailValid(false);
			setIsSumbit(false);
		} else {
			setIsEmailValid(true);
			setIsSumbit(emailData.trim() !== email);
		}
	};

	const updateUserField = () => {
		setIsSumbit(false);
		setEmailData('');
		dispatch(sendEmailResetLink({ email: emailData }));
	};

	const notifaictionsOptions = [
		{ key: 'send', value: true, text: t('send_email_notif') },
		{ key: 'notSend', value: false, text: t('dont_send_email_notif') },
	];

	return (
		<section className={styles.container}>
			<h3 className={styles.header}>{t('email')}</h3>
			<div className={styles.card}>
				<h4 className={styles.cardHeader}>{t('change_email')}</h4>
				<p className={styles.textData}>
					{t('current_email')}
					{email}
				</p>
				<Form onSubmit={updateUserField}>
					<SubmitedInput
						text={emailData}
						propKey="email"
						title={t('email_title')}
						placeholder={t('email_placeholder')}
						type="text"
						handleChange={handleChange}
						isValid={isEmailValid}
						onBlur={onBlur}
						errorText={errorMessage}
					/>
					{isSubmit && <p className={`${styles.textData} ${styles.addText}`}>{t('send_confirm_link')}</p>}
					<Button type="submit" className={styles.submitButton} disabled={!isSubmit}>
						{t('save_changes')}
					</Button>
				</Form>
				<h4 className={styles.cardHeader}>{t('email_notif')}</h4>
				<p className={styles.textData}>{t('content_notif')}</p>
				<Select
					placeholder={t('choose_option_notif')}
					className={styles.select}
					options={notifaictionsOptions}
				/>
				<p className={styles.textData}>{t('get_email_when')}</p>
				<Checkbox className={styles.checkbox} label={t('watching_issue')} />
				<Checkbox className={styles.checkbox} label={t('you_reporter')} />
				<Checkbox className={styles.checkbox} label={t('you_asignee')} />
				<Checkbox className={styles.checkbox} label={t('someone_mention')} />
				<Checkbox className={styles.checkbox} label={t('make_changes')} />
			</div>
		</section>
	);
};

export default EmailManager;
