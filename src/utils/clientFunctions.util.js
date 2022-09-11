import { ClientFunction } from "testcafe";
async function refreshPage() {
  await ClientFunction(() => {
    document.location.reload();
  })();
}

export { refreshPage };
