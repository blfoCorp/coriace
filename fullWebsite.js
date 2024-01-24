async function updateTabLinksAndHideElementsForSpecificPlans() {
    const response = await window.$memberstackDom.getCurrentMember();
    const member = response.data;

    if (member && Array.isArray(member.planConnections)) {
        // ID des plans spécifiques et leurs configurations correspondantes
        const plansConfig = [
            {
                planId: ["pln_coriace-formation-webflow-page-de-vente-6b4m0150", "pln_formation-webflow-page-de-vente-3-fois--ul110zw2", "pln_webflow-le-pack-ezhb0291", "pln_webflow-le-pack-3-fois--sshd024y", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#wpdvTabs',
                newHref: '/app/formation-membre/webflow-page-de-vente',
                lockIconId: '#wpdvLockIcn'
            },
            {
                planId: ["pln_formation-webflow-e-commerce-cms-kb40awg", "pln_formation-webflow-e-commerce-cms-3-fois--y110qun", "pln_webflow-le-pack-ezhb0291", "pln_webflow-le-pack-3-fois--sshd024y", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#wecoTabs',
                newHref: '/app/formation-membre/webflow-ecommerce',
                lockIconId: '#wecoLockIcn'
            },
            {
                planId: "pln_coriace-formation-webflow-cms-9a4w0cs2",
                tabLinkId: '#wcmsTabs',
                newHref: '/app/formation-membre/webflow-cms',
                lockIconId: '#wcmsLockIcn'
            },
            {
                planId: ["pln_coriace-webflow-th-orie-kb500c0t", "pln_le-mini-pack-webflow-3-fois--lsj50wev", "pln_le-mini-pack-webflow-2kje0tkt", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#wtheorieTabs',
                newHref: '/app/formation-membre/webflow-theorie',
                lockIconId: '#wtheorieLockIcn'
            },
            {
                planId: ["pln_coriace-udesly-webflow-vers-shopify-tf510c18", "pln_le-mini-pack-webflow-3-fois--lsj50wev", "pln_le-mini-pack-webflow-2kje0tkt", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#udeslyShopiTabs',
                newHref: '/app/formation-membre/udesly-webflow-vers-shopify',
                lockIconId: '#udeslyShopiLockIcn'
            },
            {
                planId: ["pln_coriace-webflow-cookies-2t4s03hj", "pln_le-mini-pack-webflow-3-fois--lsj50wev", "pln_le-mini-pack-webflow-2kje0tkt", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#cookiesTabs',
                newHref: '/app/formation-membre/webflow-cookies-consent',
                lockIconId: '#cookiesLockIcn'
            },
             {
                planId: ["pln_coriace-client-first-d-butant-tv510vvg", "pln_le-mini-pack-webflow-3-fois--lsj50wev", "pln_le-mini-pack-webflow-2kje0tkt", "pln_le-mega-pack-webflow-2ljs0t3b", "pln_le-mega-pack-webflow-3-fois--tnkm02zj"],
                tabLinkId: '#clientFirstTabs',
                newHref: '/app/formation-membre/webflow-client-first',
                lockIconId: '#clientFirstLockIcn'
            }
        ];

        plansConfig.forEach(planConfig => {
          let hasPlan = false;

          // Vérifier si planId est un tableau et itérer sur les IDs, sinon vérifier directement
          if (Array.isArray(planConfig.planId)) {
              hasPlan = planConfig.planId.some(id => 
                  member.planConnections.some(plan => plan.planId === id)
              );
          } else {
              hasPlan = member.planConnections.some(plan => plan.planId === planConfig.planId);
          }

          if (hasPlan) {
              const tabLink = document.querySelector(planConfig.tabLinkId);
              const lockIcon = document.querySelector(planConfig.lockIconId);
              if (tabLink) tabLink.href = planConfig.newHref;
              if (lockIcon) lockIcon.style.display = 'none';
          }
      });

    }
}

document.addEventListener("DOMContentLoaded", updateTabLinksAndHideElementsForSpecificPlans);
