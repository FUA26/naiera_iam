<#--
  This file has been claimed for ownership from @keycloakify/email-native version 260007.0.0.
  To relinquish ownership and restore this file to its original content, run the following command:
  
  $ npx keycloakify own --path "email/html/template.ftl" --revert
-->


<#macro emailLayout>
<head>
  <meta charset="UTF-8">
</head>
<body lang="id">
  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    style="background-color:#fef2f2; padding:40px 0; font-family:'Segoe UI', Arial, sans-serif; color:#334155;"
  >
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          style="background-color:#ffffff; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.05); overflow:hidden;"
        >
          <!-- Header -->
          <tr style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%);">
            <td align="center" style="padding:24px;">
              <img
                alt="Logo SIJI Pemkab Malang"
                title="SIJI - Single Identity Jaringan Integrasi"
                src="${url.resourcesUrl}/siji.png"
                height="75"
                style="display:block;"
              />
              <h1 style="color:#ffffff; font-size:24px; margin:16px 0 0; font-family:'Segoe UI', Arial, sans-serif; text-align:center; font-weight:700;">
                SIJI
              </h1>
              <p style="color:#fecaca; font-size:14px; margin:8px 0 0; text-align:center;">Single Identity Jaringan Integrasi - Pemerintah Kabupaten Malang</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <p style="font-size:16px; line-height:1.6; margin:0;">
                <#nested>
              </p>
            </td>
          </tr>

          <!-- Info -->
          <tr>
            <td style="padding:24px 40px; font-size:14px; color:#777777; border-top:1px solid #eeeeee;">
              <p style="margin:0; line-height:1.6;">
                Email ini dikirim secara otomatis oleh sistem SIJI - Pemerintah Kabupaten Malang.
                Jika Anda tidak merasa melakukan tindakan terkait, silakan abaikan email ini.
              </p>
            </td>
          </tr>
        </table>

        <!-- Global Footer (flush with card width, not center aligned) -->
        <table width="600" cellpadding="0" cellspacing="0" style="margin-top:16px;">
          <tr>
            <td style="padding:8px 40px; font-size:12px; color:#999999; text-align:left;">
              <p style="margin:4px 0;">
                © ${.now?string("yyyy")} SIJI - Pemerintah Kabupaten Malang
              </p>
              <p style="margin:4px 0;">
                Bantuan: <a href="mailto:support@malangkab.go.id" style="color:#dc2626; text-decoration:none; font-weight:500;">support@malangkab.go.id</a>
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>

</html>
</#macro>
