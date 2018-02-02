import PropTypes from "prop-types";
import React from "react";
import { injectIntl, intlShape, defineMessages, FormattedMessage } from "react-intl";
import Paper from "./Paper";
import { Button, LargeButton, makeButtonFullWidth, RedButton } from "./Button";
import UserImage from "../components/UserImage";
import { speak } from "@wordpress/a11y";
import colors from "yoast-components/style-guide/colors.json";
import styled from "styled-components";
import _noop from "lodash/noop";
import defaults from "../config/defaults.json";
import CollapsibleHeader from "./CollapsibleHeader";
import ProfileForm from "./account/profile/ProfileForm.js";
import ComposerTokens from "./account/profile/ComposerTokens";
import { COMPOSER_TOKEN_FEATURE, hasAccessToFeature } from "../functions/features";
import CreateTokenModal from "./account/profile/CreateTokenModal";
import ManageTokenModal from "./account/profile/ManageTokenModal";

const messages = defineMessages( {
	validationFormatEmail: {
		id: "validation.format.email",
		defaultMessage: "{field} must be a valid e-mail address.",
	},
	validationRequired: {
		id: "validation.required",
		defaultMessage: "{field} cannot be empty.",
	},
	duplicateEmail: {
		id: "profile.error.duplicateEmail",
		defaultMessage: "The email address could not be changed, it is probably already in use.",
	},
	labelEmail: {
		id: "profile.label.email",
		defaultMessage: "Email",
	},
	labelDelete: {
		id: "profile.label.delete",
		defaultMessage: "Delete account",
	},
	developerTokens: {
		id: "profile.label.developerTokens",
		defaultMessage: "Developer Tokens",
	},
	dangerZone: {
		id: "profile.label.dangerZone",
		defaultMessage: "Danger zone",
	},
	saving: {
		id: "profile.saving",
		defaultMessage: "Saving...",
	},
	saved: {
		id: "profile.saved",
		defaultMessage: "Email address saved",
	},
	saveEmail: {
		id: "profile.saveEmail",
		defaultMessage: "Save email address",
	},
	deletingAccount: {
		id: "profile.deleting",
		defaultMessage: "Deleting your account...",
	},
	deleteAccount: {
		id: "profile.delete",
		defaultMessage: "Delete your account",
	},
	passwordChange: {
		id: "profile.passwordChange",
		defaultMessage: "Change password",
	},
	passwordResetSend: {
		id: "profile.button.passwordResetSend",
		defaultMessage: "Send password reset email",
	},
	passwordResetSending: {
		id: "profile.button.passwordResetSending",
		defaultMessage: "Sending email...",
	},
	passwordResetSent: {
		id: "profile.passwordResetSent",
		defaultMessage: "An email has been sent, please check your inbox.",
	},
	gravatarLink: {
		id: "profile.gravatarLink",
		defaultMessage: "Gravatar website",
	},
	profilePicture: {
		id: "profile.picture",
		defaultMessage: "Profile picture",
	},
	profilePageLoaded: {
		id: "menu.account.orders.loaded",
		defaultMessage: "Account profile page loaded",
	},
} );

const Page = styled.div`
	padding: 2em;
	background-color: ${ colors.$color_white };
	display: flex;
	justify-content: space-between;

	@media screen and ( max-width: ${ defaults.css.breakpoint.mobile }px ) {
		display: block;
	}
`;

const Column = styled.div`
	flex-basis: 48%;
	p:first-child {
		margin-top: 0;
	}
`;

const Paragraph = styled.p`
	margin-bottom: 0.5em;
	font-size: 1.1em;
`;

const ComposerIntroductionArea = styled.div`
	padding: 0 32px 24px 32px;
`;

const FormMessage = styled.p`
	padding: 0.5em 0 0 ${ props => props.inline ? "1em" : "0" };
	margin: 0;
	${ props => props.inline ? "display: inline-block;" : "display: block;" }
`;

FormMessage.propTypes = {
	inline: PropTypes.bool,
};

FormMessage.defaultProps = {
	inline: false,
};

const FormError = styled( FormMessage )`
 	padding: 0.5em;
	background-color: ${ colors.$color_yellow };
	margin-top: 0.5em;
	color: ${ colors.$color_black };
`;

const PasswordReset = styled.section`
	margin: 1em 0;
`;

const DeleteButton = styled( RedButton )`
	margin: 1em 0;
`;

const CreateButtonArea = styled.div`
	padding: 16px 32px;
`;

const WideLargeButton = makeButtonFullWidth( LargeButton );

/**
 * Returns the rendered Sites Page component.
 *
 * @param {Object} props The props to use.
 *
 * @returns {ReactElement} The rendered Sites component.
 */
class ProfilePage extends React.Component {
	/**
	 * Sets the ProfilePage object.
	 *
	 * Sets (input) validation constraints, including email.
	 *
	 * @param {Object} props The props passed to the component.
	 * @returns {void}
	 */
	constructor( props ) {
		super( props );
		this.handleDelete = this.handleDelete.bind( this );
	}

	/**
	 * Creates the text to be displayed on the save button.
	 *
	 * @returns {string} Text to be used on the submit button.
	 */
	deleteButtonText() {
		return this.isDeleting()
			? <FormattedMessage id={ messages.deletingAccount.id } defaultMessage={ messages.deletingAccount.defaultMessage}/>
			: <FormattedMessage id={ messages.deleteAccount.id } defaultMessage={ messages.deleteAccount.defaultMessage }/>;
	}

	componentDidMount() {
		// Announce navigation to assistive technologies.
		let message = this.props.intl.formatMessage( messages.profilePageLoaded );
		speak( message );
	}

	componentDidUpdate() {
		this.announceActions();
	}

	/**
	 * Announce actions to assistive technologies.
	 *
	 * @returns {void}
	 */
	announceActions() {
		let message = "";

		if ( this.isDeleting() ) {
			message = this.props.intl.formatMessage( messages.deletingAccount );
		}

		if ( this.props.isSendingPasswordReset ) {
			message = this.props.intl.formatMessage( messages.passwordResetSending );
		}

		if ( this.props.hasSendPasswordReset ) {
			message = this.props.intl.formatMessage( messages.passwordResetSent );
		}

		speak( message, "assertive" );
	}

	/**
	 * Whether we are currently disabling the account.
	 *
	 * @returns {boolean} Whether we are currently disabling the account.
	 */
	isDeleting() {
		return this.props.isDeleting;
	}

	/**
	 * Returns the password reset elements for the profile page.
	 *
	 * @returns {ReactElement} The elements for the password reset.
	 */
	getPasswordReset() {
		let onClickAction = this.props.onPasswordReset;
		let passwordResetError;
		let passwordResetMessage;

		if ( this.props.isSendingPasswordReset ) {
			let message = this.props.intl.formatMessage( messages.passwordResetSending );

			/*
			 * While sending the email: prevent calling the password reset
			 * function multiple times but don't disable the button for better
			 * accessibility (avoid keyboard focus loss).
			 */
			onClickAction = _noop;

			passwordResetMessage = <FormMessage inline={ true }>{ message }</FormMessage>;
			speak( message, "assertive" );
		}

		if ( this.props.hasSendPasswordReset ) {
			let message = this.props.intl.formatMessage( messages.passwordResetSent );

			passwordResetMessage = <FormMessage>{ message }</FormMessage>;
			speak( message, "assertive" );
		}

		if ( this.props.passwordResetError ) {
			passwordResetError = <FormError role="alert">{ this.props.passwordResetError.message }</FormError>;
		}

		return <PasswordReset>
			<Paragraph>
				<FormattedMessage id={ messages.passwordChange.id } defaultMessage={ messages.passwordChange.defaultMessage }/>
			</Paragraph>

			<p><FormattedMessage
				id="profile.description.passwordReset"
				defaultMessage="To change your password follow the instructions in the password reset email."
			/></p>
			<Button onClick={ onClickAction }><FormattedMessage id={ messages.passwordResetSend.id } defaultMessage={ messages.passwordResetSend.defaultMessage }/></Button>
			{ passwordResetError }
			{ passwordResetMessage }
		</PasswordReset>;
	}

	handleDelete( event ) {
		event.preventDefault();

		this.props.onDeleteProfile();
	}

	/**
	 * Will open a modal if its respective "isOpen" boolean is set to true.
	 *
	 * @returns {*} Returns either a CreateTokenModal, a ManageTokenModal, or null, depending on whether one of these modals is open.
	 */
	getModal() {
		if ( this.props.createTokenModalIsOpen ) {
			return <CreateTokenModal
				isOpen={ this.props.createTokenModalIsOpen }
				onClose={ this.props.onCreateTokenModalClose }
				onCreateClick={ this.props.onCreateTokenClick }
				error={ this.props.tokenError }
			/>;
		} else if ( this.props.manageTokenModalIsOpen ) {
			return <ManageTokenModal
				isOpen={ this.props.manageTokenModalIsOpen }
				onClose={ this.props.onManageTokenModalClose }
				onSaveTokenClick={ this.props.onSaveTokenClick }
				onDeleteTokenClick={ this.props.onDeleteTokenClick }
				manageTokenData={ this.props.manageTokenData }
				error={ this.props.tokenError }
			/>;
		}
		return null;
	}

	/**
	 *
	 * @returns {boolean} True when there are active composer tokens among the composertokens for this user. False otherwise.
	 */
	hasActiveComposerTokens() {
		let tokens = this.props.composerTokens && this.props.composerTokens.filter( ( composerToken ) => {
			return composerToken.enabled === true;
		} );

		return tokens.length > 0;
	}

	/**
	 * A function that prepares the DevTools element.
	 *
	 * @returns {(JSXElement|null)} Either a JSX element containing the DevTools section of the profile page, or null,
	 * depending on whether the user has access to this feature via the feature toggle.
	 */
	getDevTools() {
		let ComposerIntroduction =
			<ComposerIntroductionArea>
				{
					this.hasActiveComposerTokens()
						? <FormattedMessage
							id="profile.composer-introduction"
							defaultMessage="Here you can find a list of the Composer tokens that you have registered."
						/>
						: <FormattedMessage
							id="profile.composer-introduction"
							defaultMessage="Composer is a tool used by many developers to install and update plugins.
							Through MyYoast you can use Composer to get easy access to your premium plugins. Please see the Downloads page for additional information."
						/>
				}
			</ComposerIntroductionArea>;

		return hasAccessToFeature( COMPOSER_TOKEN_FEATURE )
			? <div>
				<Paper>
					<CollapsibleHeader title={this.props.intl.formatMessage( messages.developerTokens )} isOpen={false}>
						{ ComposerIntroduction }
						<ComposerTokens {...this.props} hasPaper={false} />
						<CreateButtonArea>
							<WideLargeButton
								onClick={ this.props.onCreateTokenModalOpen }
							>
								<FormattedMessage
									id="profile.tokens.create"
									defaultMessage="Create token"
								/>
							</WideLargeButton>
						</CreateButtonArea>
					</CollapsibleHeader>
				</Paper>
				{ this.getModal() }
			</div>
			: null;
	}
	/**
	 * Renders the element.
	 * @returns {JSXElement} The rendered JSX Element.
	 */
	render() {
		let image = this.props.image ? <UserImage src={ this.props.image } size="120px"/> : "";

		return (
			<div>
				<Paper>
					<Page>
						<Column>
							<ProfileForm
								{ ...this.props }
							/>
							{ this.getPasswordReset() }
						</Column>
						<Column>
							<Paragraph>
								<FormattedMessage id={ messages.profilePicture.id } defaultMessage={ messages.profilePicture.defaultMessage }/>
							</Paragraph>
							<p>
								<FormattedMessage
									id="profile.description.picture"
									defaultMessage={ "Your profile picture is supplied by Gravatar. If you don't have" +
									" an account with them yet, or want to change your existing picture, please visit" +
									" the { link }. Changes may take up to an hour to become visible here." }
									values={ { link: <a target="_blank" rel="noopener noreferrer" href="https://gravatar.com">{ this.props.intl.formatMessage( messages.gravatarLink ) }</a> } }
								/>
							</p>
							{ image }
						</Column>
					</Page>
				</Paper>
				{ this.getDevTools() }
				<Paper>
					<CollapsibleHeader title={ this.props.intl.formatMessage( messages.dangerZone ) } isOpen={ false }>
						<Page>
							<form onSubmit={ this.handleDelete }>
								<Paragraph>
									<FormattedMessage id={ messages.labelDelete.id } defaultMessage={ messages.labelDelete.defaultMessage }/>
								</Paragraph>
								<p>
									<FormattedMessage
										id="profile.delete.message"
										defaultMessage={ "Warning! If you delete your account you lose access to" +
										" your downloads and you will no longer receive updates for any Premium" +
										" plugins you've bought from us." } />
								</p>
								<DeleteButton type="submit" disabled={ this.isDeleting() }>{ this.deleteButtonText() }</DeleteButton>
							</form>
						</Page>
					</CollapsibleHeader>
				</Paper>
			</div>
		);
	}
}

ProfilePage.propTypes = {
	intl: intlShape.isRequired,
	email: PropTypes.string.isRequired,
	userFirstName: PropTypes.string,
	userLastName: PropTypes.string,
	image: PropTypes.string,
	isSaving: PropTypes.bool,
	isSaved: PropTypes.bool,
	isDeleting: PropTypes.bool,
	isSendingPasswordReset: PropTypes.bool,
	hasSendPasswordReset: PropTypes.bool,
	passwordResetError: PropTypes.object,
	onUpdateEmail: PropTypes.func.isRequired,
	onSaveProfile: PropTypes.func.isRequired,
	onDeleteProfile: PropTypes.func.isRequired,
	onPasswordReset: PropTypes.func.isRequired,
	saveEmailError: PropTypes.object,
	onCreateTokenModalOpen: PropTypes.func.isRequired,
	onCreateTokenModalClose: PropTypes.func.isRequired,
	createTokenModalIsOpen: PropTypes.bool.isRequired,
	onCreateTokenClick: PropTypes.func.isRequired,
	manageTokenModalIsOpen: PropTypes.bool.isRequired,
	onManageTokenClick: PropTypes.func.isRequired,
	onManageTokenModalClose: PropTypes.func.isRequired,
	onSaveTokenClick: PropTypes.func.isRequired,
	onDeleteTokenClick: PropTypes.func.isRequired,
	manageTokenData: PropTypes.object,
	tokenError: PropTypes.object,
	composerTokens: PropTypes.array,
};

ProfilePage.defaultProps = {
	email: "",
	userFirstName: "",
	userLastName: "",
	saveEmailError: null,
	isSaving: false,
	isSaved: false,
	isSendingPasswordReset: false,
	hasSendPasswordReset: false,
	passwordResetError: null,
	manageTokenData: null,
	tokenError: null,
};

export default injectIntl( ProfilePage );
