import React, { ReactElement, MouseEvent, useState } from 'react';
import { Search, SearchProps } from 'semantic-ui-react';
import style from './style.module.scss';
import ResultPeople from './ResultPeople';
import ResultTeams from './ResultTeams';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';
import { IModifiedEntity } from 'typings/entityModifiedForSearchElement';
import { fillResultField } from 'helpers/fillResultsToRender.helper';
import { useTranslation } from 'react-i18next';

type ResultsToRender =
	| {
			users: {
				name: string;
				results: IModifiedEntity<WebApi.Entities.UserProfile>[];
			};
			teams: {
				name: string;
				results: IModifiedEntity<WebApi.Entities.Team>[];
			};
	  }
	| undefined;

const SearchField: React.FC = (): ReactElement => {
	const { people, teams } = useSelector((state: RootState) => state.peoplePage);
	const { t } = useTranslation();

	const [searchValue, setSearchValue] = useState('');

	const results: ResultsToRender = React.useMemo(() => {
		const teamsToRender = teams.filter(
			(team) => team.name && team.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1,
		);

		const usersToRender = people.filter((people) => {
			const fullName = `${people.firstName} ${people.lastName}`;
			return fullName.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
		});

		if (teamsToRender.length === 0 && usersToRender.length === 0) {
			return undefined;
		}

		return {
			users: fillResultField('users', usersToRender),
			teams: fillResultField('teams', teamsToRender),
		};
	}, [searchValue, teams, people]);

	const handlerChange = (e: MouseEvent<HTMLElement>, { value }: SearchProps): void => {
		if (value === undefined) {
			return;
		}
		setSearchValue(value);
	};

	const resultRender = (value: any): React.ReactElement => {
		if ((value.data as WebApi.Entities.UserProfile).firstName) {
			const { firstName, lastName, id, email, avatar } = value.data as WebApi.Entities.UserProfile;
			return <ResultPeople id={id} firstName={firstName} lastName={lastName} email={email} avatar={avatar} />;
		}

		const team = value.data as WebApi.Entities.Team;
		const { name, color, id, createdBy } = team;
		if (name && color && createdBy) {
			return <ResultTeams name={name} color={color} id={id} createdBy={createdBy} />;
		}

		return <div />;
	};

	return (
		<>
			<Search
				category
				onSearchChange={handlerChange}
				className={style.field}
				size="large"
				input={{ fluid: true, placeholder: t('search_people_page_placeholder') }}
				results={results}
				resultRenderer={resultRender}
			/>
		</>
	);
};

export default React.memo(SearchField);
