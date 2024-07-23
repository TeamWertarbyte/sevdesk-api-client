import { MixedNumber, NumericBoolean, ObjectReference } from './common';

export interface TemporaryVoucherFile {
  pages: number;
  mimeType: string;
  originMimeType: string;
  filename: string;
  contentHash: string;
  content: string[];
}

export enum VoucherCreditDebit {
  Credit = 'C',
  Debit = 'D',
}

export interface VoucherTaxRule {
  name: string;
  id: number;
  taxRates: string[];
}

export interface ExtractedVoucherInformation {
  voucher: Voucher;
  positions: VoucherPosition[];
  extractions: Extractions;
  accountDatevs: AccountDatev[];
}

export interface Voucher {
  id: string;
  objectName: 'Voucher';
  additionalInformation: unknown;
  propertyCreationOrigin: unknown;
  propertyIsBookkeepingV1: unknown;
  create: string;
  update: string;
  sevClient: SevClient;
  createUser?: ObjectReference<'SevUser'>;
  voucherDate: string;
  supplierName: string;
  supplier?: ObjectReference<'Contact'>;
  description: string;
  document: Document;
  resultDisdar?: string;
  payDate: string | null;
  status: string;
  currency: string;
  sumNet: string;
  sumTax: string;
  sumGross: string;
  sumNetAccounting: string;
  sumTaxAccounting: string;
  sumGrossAccounting: string;
  showNet: string;
  paidAmount: number;
  /** Tax type (sevdesk 1.0 only, replaced by {@link taxRule}) */
  taxType?: string;
  /** Tax set (sevdesk 1.0 only, replaced by {@link taxRule}) */
  taxSet?: ObjectReference<'TaxSet'>;
  creditDebit: VoucherCreditDebit;
  hidden: string;
  voucherType: VoucherType;
  /** @deprecated use {@link recurringInterval} instead (typo in the sevdesk API) */
  recurringIntervall: RecurringInterval | null;
  recurringInterval: RecurringInterval | null;
  recurringStartDate: string | null;
  recurringNextVoucher: string | null;
  recurringLastVoucher: string | null;
  recurringEndDate: string | null;
  enshrined: string | null;
  sendType: VoucherSendType | null;
  inSource: unknown;
  iban: string | null;
  accountingSpecialCase: unknown;
  paymentDeadline: string;
  tip: string;
  mileageRate: string;
  selectedForPaymentFile: string;
  supplierNameAtSave: unknown;
  taxmaroStockAccount: unknown;
  vatNumber: string | null;
  deliveryDate: string;
  deliveryDateUntil: string | null;
  sumDiscountNet: string;
  sumDiscountGross: string;
  sumNetForeignCurrency: string;
  sumTaxForeignCurrency: string;
  sumGrossForeignCurrency: string;
  sumDiscountNetForeignCurrency: string;
  sumDiscountGrossForeignCurrency: string;
  /** Tax rule (sevdesk 2.0 only, replaces {@link taxType} and {@link taxSet}) */
  taxRule?: ObjectReference<'TaxRule'>;
}

export enum RecurringInterval {
  Weekly = 'P0Y0M1W',
  EveryOtherWeek = 'P0Y0M2W',
  Monthly = 'P0Y1M',
  EveryOtherMonth = 'P0Y2M',
  Quaterly = 'P0Y3M',
  SemiAnual = 'P0Y6M',
  Yearly = 'P1Y',
  EveryOtherYear = 'P2Y',
  EveryThreeYears = 'P3Y',
  EveryFourYears = 'P4Y',
  EveryFiveYears = 'P5Y',
}

export enum VoucherSendType {
  Printed = 'VPR',
  Downloaded = 'VPDF',
  Mailed = 'VM',
  Postal = 'VP',
}

export interface SevClient {
  id: string;
  objectName: 'SevClient';
  additionalInformation: unknown;
  create: string;
  update: string;
  name: string;
  templateMainColor: string;
  templateSubColor: string;
  status: string;
  addressStreet: string | null;
  addressCity: string | null;
  addressZip: string | null;
  muncipalityKey: unknown;
  contactPhone: string;
  contactEmail: string;
  paypalEmail: string | null;
  vatNumber: string | null;
  ceoName: string;
  contactFax: string | null;
  domain: string;
  templateHeadlineColor: string;
  website: string | null;
  bank: unknown;
  bankNumber: string | null;
  bankAccountNumber: string | null;
  districtCourt: unknown | null;
  smallSettlement: string;
  hasSeenBasicSettingsModal: string;
  bank2: unknown;
  bankIban: string | null;
  bankBic: string | null;
  orderPaymentTerms: unknown;
  orderDeliveryTerms: unknown;
  invoiceTimeToPay: unknown;
  type: string;
  foreignId: unknown;
  defaultBillingTime: unknown;
  billingAccountNumber: unknown;
  billingBankCode: unknown;
  companyRegister: unknown;
  nameAddition: unknown;
  showNet: string;
  printShowQr: string;
  printShowPayPal: string;
  printDeliveryDate: string;
  printContactPerson: string;
  taxNumber: string | null;
  printDeliveryReturn: string;
  printPartNumber: string;
  printPosDescription: string;
  chartOfAccounts: string;
  accountingChart: ObjectReference<'AccountingChart'>;
  accountingSystem: AccountingSystem;
  contractNotePaymentTerms: unknown;
  contractNoteDeliveryTerms: unknown;
  packingListDeliveryTerms: unknown;
  invitedBy: unknown;
  partnerId: unknown;
  inviterRewarded: string;
  invoiceReminderDuration: unknown;
  invoiceReminderCharge: unknown;
  autosetDeliveryDate: string;
  addressCountry: AddressCountry;
  printPdfFooter: string;
  defaultCurrency: string;
  printPageNumbers: string;
  formOfCompany: unknown;
  companySize: unknown;
  referralProgram?: ObjectReference<'StaticReferralProgram'>;
  onBoardingStatus: unknown;
  pactasId: unknown;
  docServer: string;
  createInvoiceReminder: string;
  accountantNumber: unknown;
  accountantClientNumber: unknown;
  accountingYearBegin: unknown;
  cancelationDate: unknown;
  figoUsername: unknown;
  subscriptionStartDate: string | null;
  subscriptionEndDate: unknown;
  subscriptionCycle: unknown;
  printFoldLines: string;
  discoveredAt: unknown;
  formerBookkeepingTool: unknown;
  hasAccountant: string;
  partnerBrand: unknown;
  partnerCustomerId: unknown;
  partnerProvisioningId: unknown;
  partnerWhitelabeled: string;
  tenant: string;
  state: unknown;
}

export interface AccountingSystem {
  id: string;
  objectName: 'AccountingSystem';
  additionalInformation: unknown;
  create: string | null;
  update: string | null;
  name: string;
  accountingChart: ObjectReference<'AccountingChart'>;
}

export interface AddressCountry {
  id: string;
  objectName: 'StaticCountry';
  additionalInformation: unknown;
  code: string;
  name: string;
  nameEn: string;
  translationCode: string;
  locale: string;
  priority: string;
}

export interface VoucherPosition {
  id: string;
  objectName: 'VoucherPos';
  additionalInformation: unknown;
  create: string | null;
  update: string | null;
  sevClient?: ObjectReference<'SevClient'>;
  voucher?: Voucher;
  taxRate: MixedNumber;
  sum: MixedNumber;
  net: MixedNumber | null;
  isAsset: NumericBoolean;
  assetMemoValue: string | null;
  sumNet: MixedNumber;
  sumTax: MixedNumber;
  sumGross: MixedNumber;
  sumNetAccounting: MixedNumber;
  sumTaxAccounting: MixedNumber;
  sumGrossAccounting: MixedNumber;
  comment: string | null;
  isGwg: number;
  cateringTaxRate: unknown;
  cateringTip: unknown;
  specialAccountingField1: unknown;
  specialAccountingField2: unknown;
  specialAccountingField3: unknown;
  specialAccountingField4: unknown;
  specialAccountingField5: unknown;
  isPercentage: NumericBoolean;
  discountedValue: NumericBoolean;
  sumNetForeignCurrency: number;
  sumTaxForeignCurrency: number;
  sumGrossForeignCurrency: number;
  sumDiscountForeignCurrency: number;
  createNextPart: boolean;
}

export interface Extractions {
  AMOUNT: string[];
  BIC: string[];
  CREDITORNAME: string[];
  CURRENCY: string[];
  INVOICENUMBER: string[];
  NETAMOUNT: string[];
  TAXRATE: string[];
  INVOICEDATE: string[];
}

export interface AccountDatev {
  accountDatev: number;
  accountNumber: number;
  confidence: number;
  estimatedBy: string;
}

export interface SavedVoucher {
  voucher: Voucher;
  voucherPos: VoucherPosition[];
  document: Document;
  vatdrop: string;
}

export interface CreateVoucherPayload {
  /** Temporary filename of the voucher document */
  filename: string;
  voucher: {
    objectName: 'Voucher';
    mapAll: boolean;
    /** Voucher date (timestamp in seconds or dd.mm.yyyy) */
    voucherDate: number | string | null;
    supplier?: ObjectReference<'Contact'> | null;
    supplierName?: string | null;
    description?: string | null;
    resultDisdar?: string | null;
    /** Voucher date (timestamp in seconds or dd.mm.yyyy) */
    payDate?: string | null;
    status: VoucherStatus;
    /** Tax rule (sevdesk 2.0 only, replaces {@link taxType} and {@link taxSet}) */
    taxRule?: ObjectReference<'TaxRule'>;
    /** Tax type (sevdesk 1.0 only, replaced by {@link taxRule}) */
    taxType?: string;
    creditDebit: VoucherCreditDebit;
    voucherType: VoucherType;
    currency?: string | null;
    sumNet: number | null;
    sumGross: number | null;
    sumTax?: number | null;
    sumNetAccounting?: number | null;
    sumTaxAccounting?: number | null;
    sumGrossAccounting?: number | null;
    showNet?: boolean;
    propertyForeignCurrencyDeadline?: string | null;
    propertyExchangeRate?: number | null;
    /** Tax set (sevdesk 1.0 only, replaced by {@link taxRule}) */
    taxSet?: ObjectReference<'TaxSet'>;
    /** Payment deadline (timestamp in seconds or dd.mm.yyyy) */
    paymentDeadline?: string | number | null;
    /** Delivery date (timestamp in seconds or dd.mm.yyyy) */
    deliveryDate?: string | number | null;
    /** Delivery end date (for delivery period; timestamp in seconds or dd.mm.yyyy) */
    deliveryDateUntil?: string | number | null;
    document?: ObjectReference<'Document'> | null;
    costCentre?: ObjectReference<'CostCentre'> | null;
    /** @deprecated use {@link recurringInterval} instead (typo in the sevdesk API) */
    recurringIntervall?: RecurringInterval | null;
    recurringInterval?: RecurringInterval | null;
    recurringStartDate?: string | null;
    recurringNextVoucher?: string | null;
    recurringLastVoucher?: string | null;
    recurringEndDate?: string | null;
    accountingSpecialCase?: unknown;
    vatNumber?: string | null;
    tip?: string;
    mileageRate?: string;
    sumDiscountNet?: string | null;
    sumDiscountGross?: string | null;
    sumNetForeignCurrency?: string | null;
    sumTaxForeignCurrency?: string | null;
    sumGrossForeignCurrency?: string | null;
    sumDiscountNetForeignCurrency?: string | null;
    sumDiscountGrossForeignCurrency?: string | null;
  };
  voucherPosSave: Array<{
    objectName: 'VoucherPos';
    mapAll: boolean;
    /** Sevdesk 2.0 only (replaces {@link accountType}) */
    accountDatev?: ObjectReference<'AccountDatev'>;
    /** Sevdesk 1.0 only (replaced by {@link accountDatev}) */
    accountingType?: ObjectReference<'AccountingType'>;
    taxRate: number;
    net: number | null;
    isAsset?: boolean;
    assetMemoValue?: number | null;
    sumNet: number | null;
    sumGross: number | null;
    comment?: string | null;
    sum?: number | null;
    sumTax?: number | null;
    sumNetAccounting?: number | null;
    sumTaxAccounting?: number | null;
    sumGrossAccounting?: number | null;
    isGwg?: unknown;
    cateringTaxRate?: unknown;
    cateringTip?: unknown;
    isPercentage?: unknown;
    discountedValue?: unknown;
    sumNetForeignCurrency?: number;
    sumTaxForeignCurrency?: number;
    sumGrossForeignCurrency?: number;
    sumDiscountForeignCurrency?: number;
  }>;
}

export enum VoucherStatus {
  Draft = 50,
  Unpaid = 100,
  Transferred = 150,
  PartiallyPaid = 750,
  Paid = 1000,
}

export enum VoucherType {
  Standard = 'VOU',
  Recurring = 'RV',
}
