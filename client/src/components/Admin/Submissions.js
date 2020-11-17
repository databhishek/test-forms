import React, { Component } from 'react';
import Axios from 'axios';
import { Table } from 'evergreen-ui';

// Axios config
Axios.defaults.baseURL = process.env.REACT_APP_SERVER;
Axios.defaults.withCredentials = true;

export default class Submissions extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formId: this.props.match.params.id,
			submissions: []
		};
	}

	async componentDidMount() {
		try {
			let resp = await Axios.post('/fetchResults', { id: this.state.formId });
			if (resp.status === 200) {
				console.log(resp.data);
				this.setState({
					submissions: resp.data
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		let { submissions } = this.state;
		return (
			<div className='submissions-container'>
				<Table className='submissions-table'>
					<Table.Head>
						<Table.TextHeaderCell flexBasis={300} flexShrink={0} flexGrow={0}>
							User
						</Table.TextHeaderCell>
						<Table.TextHeaderCell>Score</Table.TextHeaderCell>
						<Table.TextHeaderCell>Checked?</Table.TextHeaderCell>
					</Table.Head>
					<Table.Body>
						{submissions.map((sub, ind) => {
							return (
								<Table.Row key={ind} isSelectable>
									<Table.TextCell flexBasis={300} flexShrink={0} flexGrow={0}>
										{sub.userId}
									</Table.TextCell>
									<Table.TextCell isNumber>{sub.score}</Table.TextCell>
									<Table.TextCell>{sub.checked ? 'Yes' : 'No'}</Table.TextCell>
								</Table.Row>
							);
						})}
					</Table.Body>
				</Table>
			</div>
		);
	}
}
