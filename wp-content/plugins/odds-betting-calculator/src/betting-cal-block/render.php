<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
?>
<section <?php echo get_block_wrapper_attributes(); ?>>
	<?php esc_html_e( 'Betting Calculator', 'ocbc' ); ?>

	<div class="results-group">
		<fieldset>
			<legend>Bet Slip</legend>
			<div class="results">
				<div class="expected-winnings">
					<span class="label"><?php esc_html_e( 'Expected Winnings', 'ocbc' ); ?></span>
					<span>
						<div class="result-values">
							<sup><?php esc_html_e( '$', 'ocbc' ); ?></sup>
							<span id="winning" class="amount">0.00</span>
						</div>
					</span>
				</div>
				<div class="expected-payout">
					<span class="label"><?php esc_html_e( 'Expected Payout', 'ocbc' ); ?></span>
					<span>
						<div class="result-values">
							<sup><?php esc_html_e( '$', 'ocbc' ); ?></sup>
							<span id="payout" class="amount">0.00</span>
						</div>
					</span>
				</div>
			</div>
		</fieldset>
	</div>

	<div class="form-wrapper">
		<div class="fields-group">
			<fieldset>
				<legend>Create Wager</legend>
				<div class="field">
					<label for="calc-bet-amount">Bet Amount</label>
					<input type="text" maxlength="10" minlength="2" id="calc-bet-amount" name="calc-bet-amount" placeholder="ie, $100" pattern="\$?[0-9]{1,5}" value="" required>
				</div>
				<div class="field">
					<label for="calc-moneyline">American Odds</label>
					<input type="text" maxlength="7" minlength="3" id="calc-moneyline" name="calc-moneyline" placeholder="ie, -110" pattern="[-+]{0,1}[0-9]{3}" value="">
				</div>
			</fieldset>
		</div>

		<div class="fields-group">
			<fieldset>
				<div class="field">
					<label for="calc-fractional">Fractional Odds</label>
					<input type="text" maxlength="6" minlength="3" id="calc-fractional" name="calc-fractional" placeholder="ie, 4/1" pattern="[0-9]{1,4}/[0-9]{1,2}" value="">
				</div>
				<div class="field">
					<label for="calc-decimal">Decimal</label>
					<input type="text" maxlength="7" minlength="1" id="calc-decimal" name="calc-decimal" placeholder="ie, 2.0" pattern="^[0-9]{1,4}(.[0-9]+)?$" value="">
				</div>
				<div class="field">
					<label for="calc-implied">Implied Odds</label>
					<input type="text" maxlength="5" minlength="2" id="calc-implied" name="calc-implied" placeholder="ie, 50%" pattern="[0-9]{1,3}(.[0-9]{1,2})?%?" value="">
				</div>
			</fieldset>
		</div>
	</div>
</section>
