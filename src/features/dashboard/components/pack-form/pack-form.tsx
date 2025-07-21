import { type Pack } from '@/types/pack-types';
import { type InputEvent, type TextAreaEvent } from '@/types/form-types';
import { Switch, Text } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import { Form } from '@radix-ui/react-form';
import { TextField, TextArea } from '@/components/alpine';
import { LinkIcon, MoneyIcon, PublicIcon } from '@/components/icons';
import { PackPhotoPanel } from '../pack-modal/pack-photo-panel';
import styles from './pack-form.module.css';
import { cn } from '@/styles/utils';
import { useCheckScreen } from '@/hooks/ui/use-check-screen';
import { type ZodFormErrors } from '@/hooks/form/use-zod-error';

type Checkboxes = {
	packAffiliate?: boolean;
	packPublic?: boolean;
	packPricing?: boolean;
};

type PackFormProps = {
	pack: Pack;
	handleFormChange: (e: InputEvent | TextAreaEvent) => void;
	handleCheckBox: (updatedCheckbox: Checkboxes) => void;
	className?: string;
	formErrors?: ZodFormErrors<{ packName: string }>;
};

const affiliateMessage =
	'You can include your own message. But by default we include the following affiliate message: Using the affiliate links in this pack helps support the creator of this pack at no extra cost to you!';

export const PackForm = ({
	pack,
	handleFormChange,
	handleCheckBox,
	className,
	formErrors,
}: PackFormProps) => {
	const { isMobile } = useCheckScreen();

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
		packAffiliate,
		packAffiliateDescription,
		packPricing,
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
						<Stack className="gap-3">
							<div className={styles.tagsContainer}>
								<TextField.Input
									name="packLocationTag"
									value={packLocationTag ?? ''}
									onChange={handleFormChange}
									label="Location"
									placeholder="Location"
									width={isMobile ? '100%' : '23%'}
								/>
								<TextField.Input
									name="packSeasonTag"
									value={packSeasonTag ?? ''}
									onChange={handleFormChange}
									label="Season"
									placeholder="Season"
									width={isMobile ? '100%' : '23%'}
								/>
								<TextField.Input
									name="packDurationTag"
									value={packDurationTag ?? ''}
									onChange={handleFormChange}
									label="Trip Duration"
									placeholder="2-3 Nights"
									width={isMobile ? '100%' : '23%'}
								/>
								<TextField.Input
									name="packDistanceTag"
									value={packDistanceTag ?? ''}
									onChange={handleFormChange}
									label="Distance with Pack"
									placeholder="200 miles"
									width={isMobile ? '100%' : '23%'}
								/>
							</div>

							<div className={styles.linkContainer}>
								<TextField.Input
									name="packUrlName"
									value={packUrlName ?? ''}
									onChange={handleFormChange}
									label="Display Text"
									placeholder="Gear Loadout Video"
									width={isMobile ? '100%' : '30%'}
								/>
								<TextField.Input
									name="packUrl"
									value={packUrl ?? ''}
									onChange={handleFormChange}
									label="Link"
									placeholder="Blogpost, Youtube Video, etc."
									width={isMobile ? '100%' : '67%'}
								/>
							</div>

							<Flex className="items-center my-2">
								<Stack className="justify-center">
									<label htmlFor="pack-pricing-switch">
										<Flex className="items-center gap-2">
											<MoneyIcon /> Pack Prices
										</Flex>
									</label>
									<Text size="2" color="gray">
										Show a price column on your pack to track expenses.
									</Text>
								</Stack>
								<Switch
									id="pack-pricing-switch"
									radius="medium"
									color="jade"
									size="3"
									ml="auto"
									checked={packPricing}
									onClick={() => handleCheckBox({ packPricing: !packPricing })}
								/>
							</Flex>

							<Flex className="items-center my-2">
								<Stack className="justify-center">
									<label htmlFor="pack-affiliate-switch">
										<Flex className="items-center gap-2">
											<LinkIcon /> Affiliate Links
										</Flex>
									</label>
									<Text size="2" color="gray">
										Enable if you use affiliate links for any of your pack items.
									</Text>
								</Stack>
								<Switch
									id="pack-affiliate-switch"
									radius="medium"
									color="jade"
									size="3"
									ml="auto"
									checked={packAffiliate ?? false}
									onClick={() => handleCheckBox({ packAffiliate: !packAffiliate })}
								/>
							</Flex>

							{packAffiliate && (
								<TextArea.Input
									name="packAffiliateDescription"
									value={packAffiliateDescription ?? ''}
									onChange={handleFormChange}
									placeholder={affiliateMessage}
									label="Custom Affiliate Message"
								/>
							)}
						</Stack>
					</Form>
				</div>
			</Stack>
		</div>
	);
};
