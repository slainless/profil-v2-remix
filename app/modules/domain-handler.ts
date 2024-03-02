import { Opaque } from "type-fest"

export type Code = `${number}.${number}.${number}.${number}`
export type UnderscoredCode = `${number}_${number}_${number}_${number}`
export type DomainToCodeMap = { [key: Domain]: Code }
export type CodeToSlugMap = { [key: Code]: Domain }
export type CodeToDomainListMap = { [key: Code]: Domain[] }

export type Domain = Opaque<string, "domain">

const domainToCode = Symbol("domain")
const codeToSlug = Symbol("slug")
const codeToDomainList = Symbol("code")

const validCodeRegexp = /\d{2}[_.]\d{2}[_.]\d{2}[_.]\d{4}/

export class DomainHandler {
  [domainToCode]: DomainToCodeMap = {};
  [codeToSlug]: CodeToSlugMap = {};
  [codeToDomainList]: CodeToDomainListMap = {}

  constructor(initialMap: DomainToCodeMap) {
    this.update(initialMap)
  }

  /** Check if domain is custom domain, returns true if not ends with .{domain} */
  static isCustomDomain(domain: Domain) {
    return domain.endsWith(".{domain}") == false
  }

  static isValidCode(code?: string): code is Code | UnderscoredCode {
    if (code == null) return false
    if (code.length != 13) return false
    return validCodeRegexp.test(code)
  }

  static isKelurahan(code: Code | UnderscoredCode) {
    return parseInt(code[9]) === 1
  }

  static normalizeCode(code: Code | UnderscoredCode): UnderscoredCode {
    return code.replaceAll(".", "_") as UnderscoredCode
  }

  add(domain: string, code: Code) {
    // for example domain = "paopao.{domain}"

    // check if paopao.{domain} ends with .{domain}
    const isCustomDomain = DomainHandler.isCustomDomain(domain as Domain)
    // add code lookup by domain,
    // in this case paopao.{domain} = 73.11.02.2006
    this[domainToCode][domain as Domain] = code

    // if domain is not custom domain (paopao.{domain})
    if (!isCustomDomain) {
      // add slug lookup by code,
      // in this case 73.11.02.2006 = paopao
      this[codeToSlug][code] = domain.replace(".{domain}", "") as Domain
    }

    // if domain list for this code is not initialized yet,
    // then init with empty array
    if (this[codeToDomainList][code] == null) this[codeToDomainList][code] = []
    // push domain to domain list
    this[codeToDomainList][code].push(domain as Domain)

    return this
  }

  remove(domain: string) {
    const isCustomDomain = DomainHandler.isCustomDomain(domain as Domain)
    // if domain is not custom domain (paopao.{domain})
    if (!isCustomDomain) {
      // lookup code of the domain
      const d = this.domainToCode(domain as Domain)
      // delete slug of the code
      if (d) delete this[codeToSlug][d]
    }

    // delete domain from domain to code map
    delete this[domainToCode][domain as Domain]
    return this
  }

  domainToCode(domain: Domain): Code | undefined {
    return this[domainToCode][domain]
  }

  domainToSlug(domain: Domain): string | undefined {
    const d = this.domainToCode(domain)
    if (d) return this[codeToSlug][d]
    return
  }

  codeToDomainList(code: Code): Domain[] | undefined {
    return this[codeToDomainList][code]
  }

  getCustomDomain(domain: Domain): Domain | undefined {
    const code = this.domainToCode(domain)
    if (code == null) return

    const domainList = this.codeToDomainList(code)
    if (domainList == null || domainList.length === 0) return
    for (const domain of domainList)
      if (DomainHandler.isCustomDomain(domain)) return domain
    return
  }

  update(newMap: DomainToCodeMap) {
    this[domainToCode] = {}
    for (const domain in newMap) {
      this.add(domain, newMap[domain as Domain])
    }
  }
}
