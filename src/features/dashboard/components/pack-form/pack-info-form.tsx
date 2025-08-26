import { type Pack, type PackFormFields } from '@/types/pack-types';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { Switch, Text } from '@radix-ui/themes';
import { Flex, Stack, Grid } from '@/components/layout';
import { Form } from '@radix-ui/react-form';
import { TextField, TextArea } from '@/components/alpine';
import { PublicIcon } from '@/components/icons';
import { PackPhotoPanel } from '../pack-modal/pack-photo-panel';
import styles from './pack-form.module.css';
import { cn } from '@/styles/utils';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';

type Checkboxes = {
	packPublic?: boolean;
};

type PackInfoFormProps = {
	pack: Pack;
	handleFormChange: (e: InputEvent | TextAreaEvent) => void;
	handleCheckBox: (updatedCheckbox: Checkboxes) => void;
	className?: string;
	formErrors?: ZodFormErrors<PackFormFields>;
};

export const PackInfoForm = ({
	pack,
	handleFormChange,
	handleCheckBox,
	className,
	formErrors,
}: PackInfoFormProps) => {

	const {
		packPublic,
		packName,
		packDescription,
		packLocationTag,
		packSeasonTag,
		packDurationTag,
		packDistanceTag,
		packUrl,
		packUrlName,
	} = pack;

	return (
		<div className={cn(styles.packForm, className)}>
			<Stack className="gap-6">
				<div className={styles.mainDetails}>
					<div className={styles.leftPanel}>
						<Form aria-label="Pack basic information">
							<Stack>
								<TextField.Input
									name="packName"
									value={packName ?? ''}
									onChange={handleFormChange}
									label="Pack Name"
									placeholder="Pack Name"
									width="100%"
									error={formErrors?.packName}
								/>

								<TextArea.Input
									name="packDescription"
									value={packDescription ?? ''}
									label="Pack Description"
									placeholder="Pack Description"
									onChange={handleFormChange}
									maxLength={250}
									error={formErrors?.packDescription}
								/>

								<Flex className="items-center my-2">
									<Stack className="justify-center">
										<label htmlFor="pack-public-switch">
											<Flex className="items-center gap-2">
												<PublicIcon /> Public
											</Flex>
										</label>
										<Text size="2" color="gray">
											Make your pack public or private.
										</Text>
									</Stack>
									<Switch
										id="pack-public-switch"
										radius="medium"
										color="jade"
										size="3"
										ml="auto"
										checked={packPublic}
										onClick={() => handleCheckBox({ packPublic: !packPublic })}
									/>
								</Flex>
							</Stack>
						</Form>
					</div>

					<div className={styles.rightPanel}>
						<PackPhotoPanel packPhotoUrl={pack.packPhotoUrl} packId={pack.packId} />
					</div>
				</div>

				<div className={styles.extraDetails}>
					<Form aria-label="Pack additional details and settings">
						<Stack className="gap-1">
							<Grid className="grid-cols-1 md:grid-cols-4 gap-4">
								<TextField.Input
									name="packLocationTag"
									value={packLocationTag ?? ''}
									onChange={handleFormChange}
									label="Location"
									placeholder="Location"
									error={formErrors?.packLocationTag}
								/>
								<TextField.Input
									name="packSeasonTag"
									value={packSeasonTag ?? ''}
									onChange={handleFormChange}
									label="Season"
									placeholder="Season"
									error={formErrors?.packSeasonTag}
								/>
								<TextField.Input
									name="packDurationTag"
									value={packDurationTag ?? ''}
									onChange={handleFormChange}
									label="Trip Duration"
									placeholder="2-3 Nights"
									error={formErrors?.packDurationTag}
								/>
								<TextField.Input
									name="packDistanceTag"
									value={packDistanceTag ?? ''}
									onChange={handleFormChange}
									label="Distance with Pack"
									placeholder="200 miles"
									error={formErrors?.packDistanceTag}
								/>
							</Grid>

							<Grid className="grid-cols-1 md:grid-cols-3 gap-4">
								<TextField.Input
									name="packUrlName"
									value={packUrlName ?? ''}
									onChange={handleFormChange}
									label="Display Text"
									placeholder="Gear Loadout Video"
									error={formErrors?.packUrlName}
								/>
								<div className="md:col-span-2">
									<TextField.Input
										name="packUrl"
										value={packUrl ?? ''}
										onChange={handleFormChange}
										label="Link"
										placeholder="Blogpost, Youtube Video, etc."
										error={formErrors?.packUrl}
									/>
								</div>
							</Grid>
						</Stack>
					</Form>
				</div>
			</Stack>
		</div>
	);
};