import { type Pack } from '@/types/pack-types';
import { type TextAreaEvent } from '@/types/form-types';
import { Switch, Text } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import { Form } from '@radix-ui/react-form';
import { TextArea } from '@/components/alpine';
import { LinkIcon, MoneyIcon, PaletteIcon } from '@/components/icons';
import { PalettePicker } from '@/shared/components/palette-picker';
import { PaletteName } from '@/styles/palette/palette-constants';
import styles from './pack-form.module.css';
import { cn } from '@/styles/utils';

type Checkboxes = {
	packAffiliate?: boolean;
	packPricing?: boolean;
};

type PackSettingsFormProps = {
	pack: Pack;
	handleFormChange: (e: TextAreaEvent) => void;
	handleCheckBox: (updatedCheckbox: Checkboxes) => void;
	onPaletteChange: (palette: PaletteName) => void;
	className?: string;
};

const affiliateMessage =
	'Default affiliate disclosure: "Some links may be affiliate links. This means you may earn a commission if visitors buy through them."';

export const PackSettingsForm = ({
	pack,
	handleFormChange,
	handleCheckBox,
	onPaletteChange,
	className,
}: PackSettingsFormProps) => {
	const { packAffiliate, packPricing, packAffiliateDescription, palette } = pack;

	return (
		<div className={cn(styles.packForm, className)}>
			<Form aria-label="Pack settings">
				<Stack className="gap-2">
					<Flex className="items-center my-2">
						<Stack className="justify-center">
							<label htmlFor="pack-pricing-switch">
								<Flex className="items-center gap-1">
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
								<Flex className="items-center gap-1">
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
							maxLength={250}
						/>
					)}

					<div className="py-4">
						<Stack className="justify-center mb-4">
							<label>
								<Flex className="items-center gap-1">
									<PaletteIcon /> Pack Palette
								</Flex>
							</label>
							<Text size="2" color="gray">
								Choose a theme to customize the feel of your pack.
							</Text>
						</Stack>
						<PalettePicker currentPalette={palette} onPaletteChange={onPaletteChange} />
					</div>
				</Stack>
			</Form>
		</div>
	);
};
