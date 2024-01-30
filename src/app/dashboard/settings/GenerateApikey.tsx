'use client';

import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { generateApiKey } from './actions';
import useQueryHandler from '@/lib/hooks/useQueryHandler';

const GenerateApikey = () => {
  const [showApiKey, setShowApiKey] = useState(false);

  const { state: generateApiKeyState, triggerQuery: triggerGenerateApiKey } =
    useQueryHandler({
      query: generateApiKey,
      queryOnMount: false,
    });
  const handleGenerateApiKey = async () => {
    const response = await triggerGenerateApiKey();

    if (response.ok) {
      setShowApiKey(true);
    }
  };

  return (
    <>
      <Dialog open={showApiKey}>
        <DialogContent disableClose>
          <DialogHeader className='tw-text-xl'>
            Key generated successfully
          </DialogHeader>
          <p>
            Your key has been generated and sent to your email. Please check
            your inbox.
          </p>

          <section className='tw-border tw-border-border tw-p-2 tw-rounded'>
            <h5>Important</h5>

            <p className='tw-text-justify'>
              Your API key is needed to access the nexticket&apos;s API. Do not
              share your API key with anyone. Be sure to keep it somewhere safe
              as you will need to generate a new key if this key is lost.
            </p>
          </section>

          <Button onClick={() => setShowApiKey(false)} className='tw-mt-2'>
            I understand
          </Button>
        </DialogContent>
      </Dialog>
      <section data-testid='generate-api-key-section'>
        <h4>Generate API key</h4>

        <p>
          Click the button below to generate an API key for your organization.
        </p>

        <Button
          onClick={handleGenerateApiKey}
          disabled={generateApiKeyState === 'pending'}
          className='tw-mt-2'
        >
          Generate key
        </Button>
      </section>
    </>
  );
};

export default GenerateApikey;
