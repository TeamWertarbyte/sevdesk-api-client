import {
  SavedVoucher,
  CreateVoucherPayload,
  ExtractedVoucherInformation,
  TemporaryVoucherFile,
  VoucherCreditDebit,
  VoucherTaxRule,
} from './types/voucher';

/**
 * A client for the sevdesk API.
 * @link https://api.sevdesk.de/
 */
export default class XentralApiClient {
  private readonly token: string;
  private readonly userAgent?: string;

  /**
   * Create a new client for the sevdesk API.
   * @param options.token API token
   * @param options.userAgent User agent to be used for all requests
   * @see https://api.sevdesk.de/
   */
  constructor(options: { token: string; userAgent?: string }) {
    this.token = options.token;
    this.userAgent = options.userAgent;
  }

  //#region Basics
  /**
   * Get the bookkeeping system version. Sevdesk 2.0 introduces some breaking API changes so you'll
   * have to use this and change the API payloads accordingly, depending on the version of the target instance.
   * @see https://tech.sevdesk.com/api_news/posts/2024_04_04-system-update-breaking-changes/
   * @returns The bookkeeping system version
   */
  getBookkeepingSystemVersion(): Promise<{ version: '1.0' | '2.0' }> {
    return this.apiRequest('/Tools/bookkeepingSystemVersion').then(
      extractObjectsFromRes,
    );
  }
  //#endregion

  //#region Voucher
  /**
   * Upload a PDF file for creating a voucher.
   * @param file.blob PDF blob
   * @param file.filename PDF filename
   * @returns Temporary voucher file to be used with {@link extractVoucherInformationFromPdf} or {@link createVoucher}
   */
  uploadTemporaryVoucherFile({
    blob,
    filename,
  }: {
    blob: Blob;
    filename: string;
  }): Promise<TemporaryVoucherFile> {
    const body = new FormData();
    body.append('file', blob, filename);
    return this.apiRequest('/Voucher/Factory/uploadTempFile', {
      method: 'POST',
      body,
    }).then(extractObjectsFromRes);
  }

  /**
   * Extract voucher information from a previously uploaded voucher file.
   * @param temporaryVoucherFile Temporary voucher file previously created using {@link uploadTemporaryVoucherFile}
   * @returns Extracted voucher information
   */
  extractVoucherInformationFromPdf(
    temporaryVoucherFile: Pick<TemporaryVoucherFile, 'filename' | 'mimeType'>,
  ): Promise<ExtractedVoucherInformation> {
    const body = new FormData();
    body.append('fileName', temporaryVoucherFile.filename);
    body.append('mimeType', temporaryVoucherFile.mimeType);
    return this.apiRequest('/Voucher/Factory/createFromPdf', {
      method: 'POST',
      body: body,
    }).then(extractObjectsFromRes);
  }

  /**
   * Create a new voucher.
   * @param voucher Voucher information
   * @returns The created voucher
   */
  createVoucher(voucher: CreateVoucherPayload): Promise<SavedVoucher> {
    return this.apiRequest('/Voucher/Factory/saveVoucher', {
      method: 'POST',
      body: JSON.stringify(voucher),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(extractObjectsFromRes);
  }

  /**
   * Get the default tax rule for vouchers.
   * Only applies to Sevdesk 2.0 (check with {@link getBookkeepingSystemVersion}).
   * @param voucherType Voucher type
   */
  getDefaultVoucherTaxRule(
    voucherType: VoucherCreditDebit,
  ): Promise<VoucherTaxRule> {
    return this.apiRequest(
      `/Voucher/Factory/getDefaultTaxRule?voucherType=${voucherType}`,
    ).then(extractObjectsFromRes);
  }
  //#endregion

  /**
   *
   * @param route Route with leading slash (eg. /version)
   * @param options Request options
   * @returns Response, if the request was successful
   * @throws Throws an error if the request was not successfull (ie. not a 2xx response)
   */
  private apiRequest(
    route: string,
    options?: Omit<RequestInit, 'headers'> & {
      headers?: Record<string, string>;
    },
  ): Promise<Response> {
    const headers: Record<string, string> = this.userAgent
      ? {
          Authorization: this.token,
          'User-Agent': this.userAgent,
          ...options?.headers,
        }
      : {
          Authorization: this.token,
          ...options?.headers,
        };

    return fetch(`https://my.sevdesk.de/api/v1${route}`, {
      ...options,
      headers,
    }).then(async (res) => {
      if (!res.ok) {
        let text = `Status ${res.status}`;
        try {
          text += `; ${await res.text()}`;
        } catch {
          // ignore
        }
        throw new Error(`Request to ${route} failed (${text})`, {
          cause: text,
        });
      }
      return res;
    });
  }
}

function extractObjectsFromRes(res: Response) {
  return res.json().then(({ objects }) => objects);
}
